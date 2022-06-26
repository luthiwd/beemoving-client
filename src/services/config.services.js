//Lugar donde estara configurado el servios
import axios from "axios";

const service = axios.create({
  baseURL:`${process.env.REACT_APP_SERVER_URL}/api`,
})

//!AQUI ES EL CÓDIGO MAGIA DONDE EL TOKEN SERA ENVIADO AL BE
service.interceptors.request.use((config) => {

  // BUSCAMOS EL TOKEN EN LOCALSTORAGE
  const authToken = localStorage.getItem("authToken")


  if(authToken) {
    config.headers = { authorization: `Bearer ${authToken}`}
  }


  return config

})

export default service