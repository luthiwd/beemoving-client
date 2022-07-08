import service from "./config.services";

const actionDetailsService = (id) => {
  return service.get(`/actions/${id}`)
}

const editActionService = (id, editAction) => {
  return service.patch(`/actions/${id}`, editAction)
}

const deleteActionService =(id) => {
  return service.delete(`/actions/${id}`)
}

export {
  editActionService,
  actionDetailsService,
  deleteActionService
}