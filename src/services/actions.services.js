import service from "./config.services";

const getAllActionsService = () => {
  return service.get('/acciones')
}

const addActionsService = (id) => {
  return service.patch(`/${id}/acciones/edit`)
}

export {
  getAllActionsService,
  addActionsService,
}