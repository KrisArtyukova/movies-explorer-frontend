import React, { useState } from 'react';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import {
  MAX_WIDTH_1279,
  MAX_WIDTH_426,
  MAX_WIDTH_768,
  MIN_WIDTH_427, MIN_WIDTH_990,
} from '../../utils/constants';

const countOfMoviesToShowForFullSize = 16;
const countOfMoviesToShowForMinFullSize = 15;
const countOfMoviesToShowForMiddleSize = 8;
const countOfMoviesToShowForSmallSize = 5;

function useMoviesCardList({ setMoviesToShow, moviesToShow }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);
  const mediaQueryList990to1279 = window.matchMedia(`${MIN_WIDTH_990} and ${MAX_WIDTH_1279}`);
  const mediaQueryList427to768 = window.matchMedia(`${MIN_WIDTH_427} and ${MAX_WIDTH_768}`);
  const mediaQueryList426 = window.matchMedia(MAX_WIDTH_426);
  const [startPosition, setStartPosition] = useState(0);
  const [moreBtnVisible, setMoreBtnVisilble] = useState(false);

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
    } else if (mediaQueryList990to1279.matches) {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForMinFullSize);
      setStartPosition(countOfMoviesToShowForMinFullSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForMinFullSize);
    } else {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForFullSize);
      setStartPosition(countOfMoviesToShowForFullSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForFullSize);
    }
  }

  const showMore = () => {
    if (mediaQueryList990to1279.matches) {
      setMoviesToShow(
        moviesToShow.concat(
          moviesContext.movies.slice(
            startPosition,
            startPosition + countOfMoviesToShowForMinFullSize,
          ),
        ),
      );
      setStartPosition(startPosition + countOfMoviesToShowForMinFullSize);
    } else if (mediaQueryList427to768.matches) {
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

  return {
    moviesToShow,
    setMoviesToShow,
    startPosition,
    setStartPosition,
    moreBtnVisible,
    setMoreBtnVisilble,
    showMore,
    resolveMoviesList,
    moviesContext,
    appContext,
  };
}

export default useMoviesCardList;
