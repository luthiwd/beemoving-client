import service from "./config.services";

const getAllActionsService = () => {
  return service.get('/acciones')
}


export {
  getAllActionsService,
}