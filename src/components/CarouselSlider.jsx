import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaPlayCircle } from 'react-icons/fa';

const CarouselSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const overlay = {
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
        <Carousel.Item>
          <img src={`https://image.tmdb.org/t/p/original/q62bpQ67qaXY0u6b2wFEnQYIbPd.jpg`} className="img" />
          <div style={overlay} />
          <Carousel.Caption className="Movie-caption" style={{ textAlign: 'left', marginLeft: '-180px', width: '50%' }}>
            <h1 className="Movie-judul">Toy Story 4</h1>
            <p className="Movie-deskripsi">
              Woody has always been confident about his place in the world and that his priority is taking care of his kid, whether thats Andy or Bonnie. But when Bonnie adds a reluctant new toy called Forky to her room, a road trip
              adventure alongside old and new friends will show Woody how big the world can be for a toy.
            </p>
            <a href="#" className="Movie-btn" style={{ maxWidth: '200px' }}>
              {' '}
              <FaPlayCircle style={{ marginRight: '5px', marginBottom: '2px' }} />
              WATCH TRAILER
            </a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={`https://image.tmdb.org/t/p/original/hbAG0I3l9CxmljXsIU8Lyb7hQKJ.jpg`} className="img" />
          <div style={overlay} />
          <Carousel.Caption className="Movie-caption" style={{ textAlign: 'left', marginLeft: '-180px', width: '50%' }}>
            <h1 className="Movie-judul">Spider-Man: Across the Spider-Verse</h1>
            <p className="Movie-deskripsi">
              After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the
              Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.
            </p>
            <a href="#" className="Movie-btn" style={{ maxWidth: '200px' }}>
              {' '}
              <FaPlayCircle style={{ marginRight: '5px', marginBottom: '2px' }} />
              WATCH TRAILER
            </a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={`https://image.tmdb.org/t/p/original/robYRZk9LxJTwD7GlZCginji5k.jpg`} className="img" />
          <div style={overlay} />
          <Carousel.Caption className="Movie-caption" style={{ textAlign: 'left', marginLeft: '-180px', width: '40%' }}>
            <h1 className="Movie-judul">Cars 2</h1>
            <p className="Movie-deskripsi">
              Star race car Lightning McQueen and his pal Mater head overseas to compete in the World Grand Prix race. But the road to the championship becomes rocky as Mater gets caught up in an intriguing adventure of his own:
              international espionage.
            </p>
            <a href="#" className="Movie-btn" style={{ maxWidth: '200px' }}>
              {' '}
              <FaPlayCircle style={{ marginRight: '5px', marginBottom: '2px' }} />
              WATCH TRAILER
            </a>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselSlider;
