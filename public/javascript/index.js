const charactersAPI = new APIHandler("https://minions-api.herokuapp.com/characters");

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(res => {
        document.querySelector('.characters-container').innerHTML = ''
        res.data.forEach(e =>
          document.querySelector('.characters-container').innerHTML += `<div class="character-info"><div class="id">CharacterID: ${e.id}</div><div class="name">Character Name: ${e.name}</div><div class="occupation">Character Occupation: ${e.occupation}</div><div class="cartoon">Is a Cartoon? ${e.cartoon}</div><div class="weapon">Character Weapon: ${e.weapon}</div></div >`
        )
      })
      .catch(err => console.log(err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const editInputs = document.querySelectorAll('#edit-character-form .field input')
    const characterid = document.querySelector('#character-id').value
    charactersAPI
      .getOneRegister(characterid)
      .then(res => {
        if (res.data == null) {
          document.querySelector('#fetch-one').classList.remove('btngreen')
          document.getElementById('fetch-one').classList.add('btnred')
        }
        if (res.data) {
          document.querySelector('#fetch-one').classList.remove('btnred')
          document.querySelector('#fetch-one').classList.add('btngreen')
          editInputs[0].value = res.data.id
          editInputs[1].value = res.data.name
          editInputs[2].value = res.data.occupation
          editInputs[3].value = res.data.weapon
          editInputs[4].checked = res.data
          charactersAPI.renderOne(res)
        }
        if (res.data.name == "CastError") {
          document.querySelector('#fetch-one').classList.remove('btngreen')
          document.getElementById('fetch-one').classList.add('btnred')
        }
        if (res.data.id == undefined) {
          document.querySelector('#fetch-one').classList.remove('btngreen')
          document.getElementById('fetch-one').classList.add('btnred')
        }
      })
      .catch(err => {
        console.log(err)
      })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterIdDelete = document.querySelector('#character-id-delete').value
    if (characterIdDelete) {
      charactersAPI
        .deleteOneRegister(characterIdDelete)
        .then(() => {
          document.querySelector('#delete-one').classList.remove('btnred')
          document.querySelector('#delete-one').classList.add('btngreen')
          charactersAPI.getFullList()
        })
        .catch(err => {
          document.querySelector('#delete-one').classList.remove('btngreen')
          document.getElementById('fetch-one').classList.add('btnred')
          console.log(err)
        })
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const editInputs = document.querySelectorAll('#edit-character-form .field input')
    event.preventDefault()
    const id = editInputs[0].value
    const characterData = {
      name: editInputs[1].value,
      occupation: editInputs[2].value,
      weapon: editInputs[3].value,
      cartoon: editInputs[4].checked,
    }
    charactersAPI
      .updateOneRegister(id, characterData)
      .then(res => {
        document.querySelector('.createbtn').classList.remove('btnred')
        document.querySelector('.createbtn').classList.add('btngreen')
        console.log(res)
        charactersAPI.getOneRegister(id)
        charactersAPI.renderOne(res)
      })
      .catch(err => {
        document.querySelector('.updatebtn').classList.remove('btngreen')
        document.querySelector('.updatebtn').classList.add('btnred')
        console.log(err)
      })


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form .field input')
    const characterData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }
    charactersAPI
      .createOneRegister(characterData)
      .then(res => {
        document.querySelector('.createbtn').classList.remove('btnred')
        document.querySelector('.createbtn').classList.add('btngreen')
        return charactersAPI.getFullList()
      })
      .then(res => charactersAPI.renderFullList(res))
      .catch(err => {
        document.querySelector('.createbtn').classList.remove('btngreen')
        document.querySelector('.createbtn').classList.add('btnred')
        console.log(err)
      })
  });
});
