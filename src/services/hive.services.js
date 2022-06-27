import service from "./config.services";

const allHiveService = () => {
  return service.get('/colmenas')
}

const oneHiveService = (id) => {
  return service.get(`/colmenas/${id}`)
}

const addNewHiveService = (newHive) => {
  return service.post('/colmenas/new', newHive)
}

const updateHiveService = (id, updateHive) => {
  return service.patch(`/colmenas/${id}`, updateHive)
}

const deleteHiveService =(id) => {
  return service.delete(`/colmenas/${id}`)
}

export {
  oneHiveService,
  allHiveService,
  addNewHiveService,
  deleteHiveService,
  updateHiveService
}