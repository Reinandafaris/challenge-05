import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogin from '../components/GoogleLogin';
import CarouselSlider from '../components/CarouselSlider';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        password,
      });

      let config = {
        method: 'post',
        url: `${import.meta.env.VITE_API}/v1/auth/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem('token', token);

      navigate('/');

      // Temporary solution
      window.location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const handleCloseRegister = () => {
    const login = document.querySelector('.wrapper-login');
    login.classList.remove('active');
  };

  const handleShowPassword = () => {
    setIsClicked(!isClicked);
    var passwordField = document.getElementById('passwordField');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  };

  return (
    <>
      <>
        <CarouselSlider />
      </>
      <div className="wrapper-login">
        <Container className="d-flex justify-content-center align-item-center">
          <Row className="baris-register">
            <Col>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <div className="tag-group">
                    <h1 className="tag-register">Log In to Your Account</h1>
                    <label onClick={handleCloseRegister} className="cross2">
                      <i className="fa-solid fa-forward"></i>
                    </label>
                  </div>
                  <div className="line">
                    <div className="form-input">
                      <input type="email" placeholder="Email Address" className="isi-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-icon">
                      <i className="fa-regular fa-envelope"></i>
                    </div>
                  </div>
                  <div className="line">
                    <div className="form-input">
                      <input type="password" id="passwordField" placeholder="Password" className="isi-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-icon" onClick={handleShowPassword}>
                      {isClicked ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                    </div>
                  </div>
                  <button type="submit" className="tombol-submit">
                    Login
                  </button>
                  <GoogleLogin buttonText="Login with Google" />
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Container className="p-4">
        <Row className="mb-4">
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">Well never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="text-center">Or</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <GoogleLogin buttonText="Login with Google 🚀" />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default Login;
