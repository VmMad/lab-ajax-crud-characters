class APIHandler {
  constructor(baseUrl) {
    this.axiosApp = axios.create({
      baseURL: baseUrl
    })
  }

  renderFullList(arg) {
    document.querySelector('.characters-container').innerHTML = ''
    arg.data.forEach(e =>
      document.querySelector('.characters-container').innerHTML += `<div class="character-info"><div class="id">CharacterID: ${e.id}</div><div class="name">Character Name: ${e.name}</div><div class="occupation">Character Occupation: ${e.occupation}</div><div class="cartoon">Is a Cartoon? ${e.cartoon}</div><div class="weapon">Character Weapon: ${e.weapon}</div></div >`
    )
  }
  renderOne(res) {
    document.querySelector('.characters-container').innerHTML = ''
    document.querySelector('.characters-container').innerHTML += `<div class="character-info"><div class="id">CharacterID: ${res.data.id}</div><div class="name">Character Name: ${res.data.name}</div><div class="occupation">Character Occupation: ${res.data.occupation}</div><div class="cartoon">Is a Cartoon? ${res.data.cartoon}</div><div class="weapon">Character Weapon: ${res.data.weapon}</div></div >`
  }

  getFullList() {
    return this.axiosApp.get('/')
  }

  getOneRegister(id) {
    return this.axiosApp.get(`/${id}`)
  }

  createOneRegister(character) {
    return this.axiosApp.post('/', character)
  }

  updateOneRegister(id, character) {
    return this.axiosApp.put(`/${id}`, character)
  }

  deleteOneRegister(id) {
    return this.axiosApp.delete(`/${id}`)
  }

}
