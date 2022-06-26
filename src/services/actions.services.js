import service from "./config.services";

const getAllActionsService = () => {
  return service.get('/acciones')
}

// const getActionByIdService = (idAction) => {
//   return service.get(`/${idAction}`)
// }

const addActionsService = (id) => {
  return service.patch(`/${id}/acciones/edit`)
}

export {
  getAllActionsService,
  addActionsService,
  // getActionByIdService
}