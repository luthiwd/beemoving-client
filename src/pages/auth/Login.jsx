import { useState, useContext } from "react";
import { loginService } from '../../services/auth.services.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context.js";

function Login() {

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here
    const user = {
      email,
      password
    }

    try {
      
      //validaremos al usuario
      const response = await loginService(user)
      //console.log("Usuario validado", response.data)

      //!GUARDAMOS EL TOKEN EN LOCALSTORAGE
      localStorage.setItem("authToken", response.data.authToken)
      authenticateUser()
      // asignar los valores a los estados globales para manejo en el FE
      navigate('/')

    } catch (error) { 
      if(error.response.status === 400 || error.response.status===401){
        setErrorMessage(error.response.data.errorMessage)
      }else{
        navigate("/error")
      }
    }
  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        { errorMessage !== null && <p>{errorMessage}</p>}     

        <button type="submit">Login</button>
      </form>
      
    </div>
  );
}

export default Login;