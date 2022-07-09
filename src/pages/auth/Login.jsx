import { useState, useContext } from "react";
import { loginService } from '../../services/auth.services.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context.js";
import {Button, Form, Modal} from 'react-bootstrap'

function Login() {

  const navigate = useNavigate()

  const { authenticateUser } = useContext(AuthContext)
  const [show, setShow] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <>
    <Button variant="success" onClick={handleShow}>
      Acceder
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={handlePasswordChange}/>
          </Form.Group>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" onClick={handleClose}>
            Login
          </Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
      
    </Modal>
  </>


    // <div>

    //   <h1>Log In</h1>

    //   <form onSubmit={handleLogin}>
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={email}
    //       onChange={handleEmailChange}
    //     />
    //     <br />
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={handlePasswordChange}
    //     />
    //     <br />
    //     { errorMessage !== null && <p>{errorMessage}</p>}     

    //     <button type="submit">Login</button>
    //   </form>
      
    // </div>
  );
}

export default Login;