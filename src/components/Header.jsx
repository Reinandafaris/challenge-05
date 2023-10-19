import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    const login = document.querySelector('.wrapper-login');
    login.classList.toggle('active');
  };

  const handleRegisterClick = () => {
    const register = document.querySelector('.wrapper-register');
    register.classList.toggle('active');
  };

  const handleDashboardClick = () => {
    const dash = document.querySelector('.wrapper-dash');
    dash.classList.remove('active');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'transparent', position: 'absolute', width: '100%', zIndex: '1' }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            MovieList
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to={'/users/dashboard'} onClick={handleDashboardClick} className="kiri">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link
                    className="kanan"
                    onClick={() => {
                      localStorage.removeItem('token');
                      setIsLoggedIn(false);
                      return navigate('/');
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={'/login'} onClick={handleLoginClick} className="kiri">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/register'} onClick={handleRegisterClick} className="kanan">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
