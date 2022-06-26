import service from "./config.services";

const allHiveService = () => {
  return service.get('/colmenas')
}

const oneHiveService = (id) => {
  return service.get(`/colmenas/${id}`)
}

const addNewHiveService = (newHive) => {
  return service.post('/colmenas', newHive)
}

export {
  oneHiveService,
  allHiveService,
  addNewHiveService
}