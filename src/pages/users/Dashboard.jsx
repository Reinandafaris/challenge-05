import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import CarouselSlider from '../../components/CarouselSlider';
import { getMovieList } from '../../api/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [buttonText, setButtonText] = useState('More Movie');
  const [showAllMovies, setShowAllMovies] = useState(false);

  // useEffect(() => {
  //   const getPopularMovies = async () => {
  //     try {
  //       const token = localStorage.getItem('token');

  //       const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/movie/popular`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = response.data.data;

  //       setUser(data);
  //       console.log(data);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         // If not valid token
  //         if (error.response.status === 401) {
  //           localStorage.removeItem('token');
  //           // Temporary solution
  //           return (window.location.href = '/');
  //         }

  //         toast.error(error.response.data.message);
  //         return;
  //       }
  //       toast.error(error.message);
  //     }
  //   };

  //   getPopularMovies();
  // }, []);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_API}/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            // Temporary solution
            return (window.location.href = '/');
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getMe();
  }, []);

  const PopularMovieList = () => {
    const limited = showAllMovies ? popularMovies : popularMovies.slice(0, 4);
    return limited.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <Link to={`/MovieDetail/${movie.id}`}>
            <img className="Movie-image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </Link>
        </div>
      );
    });
  };

  // const search = async (q) => {
  //   if (q.length > 3) {
  //     const query = await searchMovieList(q);
  //     setPopularMovies(query.results);
  //   }
  // };

  const handleClickClose = () => {
    const dash = document.querySelector('.wrapper-dash');
    dash.classList.toggle('active');
  };

  const changeText = () => {
    setShowAllMovies(!showAllMovies);
    const newText = buttonText === 'More Movie' ? 'Less Movie' : 'More Movie';
    setButtonText(newText);
  };

  return (
    <>
      <div className="wrapper-dash">
        <Container className="d-flex justify-content-center align-item-center">
          <Row className="baris-register">
            <Col>
              <form>
                <div className="form-group2">
                  <Col className="text-center">
                    <label className="cross3" onClick={handleClickClose}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </label>
                  </Col>
                  <div className="tag-group">
                    <h1 className="text-center">
                      Hi, {user?.name} with {user?.email}! <br />
                      This page only can be accessed by user having login
                    </h1>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <>
        <CarouselSlider />
      </>
      <Row className="w-100">
        <Col className="col-9">
          <h2 className="tag-popular">Popular Movies</h2>
        </Col>
        <Col className="p-0">
          <h5 id="myButton" className="tag-popular2" onClick={changeText}>
            {buttonText} <i className="fa-solid fa-arrow-right"></i>
          </h5>
        </Col>
      </Row>
      <div className="Movie-container">
        <PopularMovieList />
      </div>
      <footer className="footer">MovieList &copy;2023.</footer>
    </>
  );
}

export default Dashboard;
