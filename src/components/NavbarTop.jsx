import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Navbar, Nav, Container } from "react-bootstrap";
import IsPrivate from "./IsPrivate";
import Login from "../pages/auth/Login";


//Componente para la navegación y el control de acceso a distintas partes

function NavbarTop() {
  const { isLogin, user, authenticateUser } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  //Renderizamos el Componente que estara presente en toda la App

  return (
    <div className="NavbarTop">
      {isLogin === true ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="logo" as={NavLink} to="/">
            <img
              src="https://res.cloudinary.com/djersm2h6/image/upload/v1657367542/beemoving/imagenes/logo_dgtgxh.png"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="">
                  Colmenas Actuales
                </Nav.Link>
                <Nav.Link as={NavLink} to="/colmenas/new">
                  Crear Nueva Colmena
                </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/profile">
                <p>{user.username.toUpperCase()} </p>
              </Nav.Link>
              <Nav.Link onClick={handleLogOut} as={NavLink} to="/">
                Cerrar sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="logo" as={NavLink} to="/">
              <img
                src="https://res.cloudinary.com/djersm2h6/image/upload/v1655546452/imagesportfolio/beemoving_w8gzkc.png"
                height="32"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">
                  Colmenas
                </Nav.Link>
              </Nav>
              <Nav>
                <IsPrivate>
                  <Nav.Link as={NavLink} to="/signup">
                    Regístrate
                  </Nav.Link>
                </IsPrivate>
                  <Login setShow={true}/>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavbarTop;