import React, {
  useCallback, useEffect, useState,
} from 'react';
import './MoviesCardList.css';
import { v4 as uuidv4 } from 'uuid';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesContext from '../../contexts/MoviesContext';
import NotFound from '../NotFound/NotFound';

const countOfMoviesToShowForFullSize = 16;
const countOfMoviesToShowForMiddleSize = 8;
const countOfMoviesToShowForSmallSize = 5;

function MoviesCardList({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [startPosition, setStartPosition] = useState(0);
  const [moreBtnVisible, setMoreBtnVisilble] = useState(false);
  const mediaQueryList427to768 = window.matchMedia('(min-width: 427px) and (max-width: 768px)');
  const mediaQueryList426 = window.matchMedia('(max-width: 426px)');

  function resolveMoviesList() {
    if (mediaQueryList427to768.matches) {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForMiddleSize);
      setStartPosition(countOfMoviesToShowForMiddleSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForMiddleSize);
    } else if (mediaQueryList426.matches) {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForSmallSize);
      setStartPosition(countOfMoviesToShowForSmallSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForSmallSize);
    } else {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForFullSize);
      setStartPosition(countOfMoviesToShowForFullSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForFullSize);
    }
  }

  useEffect(() => {
    setMoreBtnVisilble(!!moviesContext.movies.length);
    if (moviesContext.movies.length) resolveMoviesList();
  }, [moviesContext.movies]);

  const handleResize = useCallback(() => resolveMoviesList(), [moviesContext.movies]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => () => {
    window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const showMore = () => {
    if (mediaQueryList427to768.matches) {
      setMoviesToShow(
        moviesToShow.concat(
          moviesContext.movies.slice(
            startPosition,
            startPosition + countOfMoviesToShowForMiddleSize,
          ),
        ),
      );
      setStartPosition(startPosition + countOfMoviesToShowForMiddleSize);
    } else if (mediaQueryList426.matches) {
      setMoviesToShow(
        moviesToShow.concat(
          moviesContext.movies.slice(
            startPosition,
            startPosition + countOfMoviesToShowForSmallSize,
          ),
        ),
      );
      setStartPosition(startPosition + countOfMoviesToShowForSmallSize);
    } else {
      const additionalMovies = moviesContext.movies.slice(
        startPosition,
        startPosition + countOfMoviesToShowForFullSize,
      );
      setMoviesToShow(moviesToShow.concat(additionalMovies));
      setMoreBtnVisilble(additionalMovies.length === countOfMoviesToShowForFullSize);
      setStartPosition(startPosition + countOfMoviesToShowForFullSize);
    }
  };

  if (moviesToShow.length === 0) return <NotFound />;

  return (
    <section className="cards">
      <ul className="cards__container">
        {moviesToShow?.map((movie) => (
          <MoviesCard
            title={movie.nameRU}
            page={page}
            imgAlt={movie.description}
            image={movie.image.url}
            trailerLink={movie.trailerLink}
            duration={movie.duration}
            key={uuidv4()}
          />
        )) }
      </ul>
      {moreBtnVisible ? (
        <div className="cards__more">
          <button type="button" className="cars__more_btn" onClick={showMore}>Еще</button>
        </div>
      ) : null}
    </section>
  );
}

export default MoviesCardList;
