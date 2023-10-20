import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { ShopContext } from '../context/shop';

const NavMenu = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const { toggleCart } = useContext(ShopContext) as ShopContextType;
  const navigate = useNavigate();

  const openCart = () => {
    if (user) {
      toggleCart();
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      className="mb-4 p-2"
    >
      <Container>
        <Navbar.Brand href="/">Mern Shopping Mall</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={() => logout()}>
                  Logout
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            <Nav.Item>
              <Nav.Link onClick={openCart}>
                <BsFillCartCheckFill style={{ fontSize: 25 }} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
