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

const editHiveService = (id, editHive) => {
  return service.patch(`/colmenas/${id}`, editHive)
}

const addActionHiveService = (id, addAction) => {
  return service.patch(`/colmenas/${id}/action`, addAction)
}

const deleteActionInHiveService = (idHive, idAction) => {
  return service.patch(`/colmenas/${idHive}/${idAction}/deleteAction`)
}

const deleteHiveService =(id) => {
  return service.delete(`/colmenas/${id}`)
}

export {
  oneHiveService,
  allHiveService,
  addNewHiveService,
  deleteHiveService,
  editHiveService,
  addActionHiveService,
  deleteActionInHiveService
}