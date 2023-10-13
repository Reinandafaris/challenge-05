import { FaPlayCircle, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3c892387424c866050c27a24982a568e`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
        setMovie(null);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    zIndex: '999',
  };

  const overlay = {
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: '1',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="Movie-detail" style={backgroundStyle}>
      <div style={overlay}>
        <div className="container" style={containerStyle}>
          <div className="Movie-detail-content">
            <h1 className="Movie-detail-judul" style={{ marginBottom: '30px' }}>
              {movie.title}
            </h1>
            <p>Gendre : {movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'Tidak ada data genres'}</p>
            <p>
              <FaStar style={{ color: 'gold', marginLeft: '0px', marginBottom: '5px' }} /> {parseFloat(movie.vote_average).toFixed(1)} / 10
            </p>
            <p className="card-text">{movie.overview}</p>
            <a href="#" className="Movie-btn2" style={{ maxWidth: '200px', textDecoration: 'none' }}>
              <FaPlayCircle style={{ marginRight: '5px', marginBottom: '20px', marginTop: '15px' }} />
              WATCH TRAILER
            </a>
            <Link to={'/users/dashboard'}>
              <button type="button" className="Movie-back">
                BACK TO HOME
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
