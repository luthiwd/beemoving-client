import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  //TODOS LOS ESTADOS Y FUNCIONES
  const [isLogin, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const authenticateUser = async () => {
    setIsLoading(true)
    try {
      // DONDE LLAMAREMOS A ESA RUTA VERIFY
      const response = await verifyService();
      // console.log("Token valido");
      // console.log("el payload es: ", response.data);
      setIsLoggedIn(true);
      setUser(response.data);
      setIsLoading(false)
    } catch (error) {
      // console.log("el ususario no tiene Token o el token no es valido");
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false)
    }
  };

  const passedContext = {
    isLogin,
    user,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser()
  }, [])

  //!ESPERA MIENSTRAS VERIFICAMOS AL USUARIO; ANTES DE RENDERIZAR LA APP

  if (isLoading === true){
    return <div className="progress"><div className="progress-value"></div></div>
  }

  //! ESTO ES TODA NUESTRA APP

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
