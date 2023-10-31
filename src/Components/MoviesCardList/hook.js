import React, { useState } from 'react';
import toast from 'react-hot-toast';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import { MoviesPage, SAVED_MOVIES_STATE } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';
import { moviesFilter } from '../../utils/utils';

const countOfMoviesToShowForFullSize = 16;
const countOfMoviesToShowForMiddleSize = 8;
const countOfMoviesToShowForSmallSize = 5;

function useMoviesCardList({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);
  const mediaQueryList427to768 = window.matchMedia('(min-width: 427px) and (max-width: 768px)');
  const mediaQueryList426 = window.matchMedia('(max-width: 426px)');
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [startPosition, setStartPosition] = useState(0);
  const [moreBtnVisible, setMoreBtnVisilble] = useState(false);
  const [likedMoviesId, setLikedMoviesId] = useState([]);

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

  const onDeleteClick = (_id) => {
    appContext.setLoading(true);
    moviesApi.deleteMovie(_id)
      .then((response) => {
        const savedMoviesState = localStorage.getItem(SAVED_MOVIES_STATE);
        if (savedMoviesState === '' && savedMoviesState === null) {
          localStorage.setItem(
            SAVED_MOVIES_STATE,
            JSON.stringify({ movies: [] }),
          );
          return;
        }

        const newSavedMovies = JSON.parse(savedMoviesState).movies
          .filter((movie) => movie._id !== response.data._id);

        localStorage.setItem(
          SAVED_MOVIES_STATE,
          JSON.stringify({ movies: newSavedMovies }),
        );
        appContext.setLoading(false);
        appContext.setMoviesError(undefined);
        if (page === MoviesPage.SavedMovies) {
          moviesContext.setMovies(moviesFilter(newSavedMovies, '', false, page));
        }
        setLikedMoviesId(newSavedMovies);
      })
      .catch((error) => {
        appContext.setLoading(false);
        appContext.setMoviesError(error);
        toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
      });
  };

  const onLikeClick = (movieId) => {
    const likedMovie = moviesToShow.find((movie) => (movie.id ?? movie.movieId) === movieId);
    if (likedMovie) {
      appContext.setLoading(true);
      moviesApi.createMovie({
        movieId: likedMovie?.id || likedMovie?.movieId,
        country: likedMovie.country,
        description: likedMovie.description,
        duration: likedMovie.duration,
        trailerLink: likedMovie.trailerLink,
        image: likedMovie.image.url || likedMovie.image,
        director: likedMovie.director,
        nameRU: likedMovie.nameRU,
        year: likedMovie.year,
        nameEN: likedMovie.nameEN,
        thumbnail: likedMovie.image?.formats?.thumbnail?.url || likedMovie.thumbnail,
      })
        .then((response) => {
          appContext.setLoading(false);

          const savedMoviesState = localStorage.getItem(SAVED_MOVIES_STATE);
          if (savedMoviesState === '' && savedMoviesState === null) {
            localStorage.setItem(
              SAVED_MOVIES_STATE,
              JSON.stringify({ movies: [] }),
            );
            return;
          }

          const newSavedMovies = JSON.parse(savedMoviesState).movies.concat([response.data]);
          localStorage.setItem(
            SAVED_MOVIES_STATE,
            JSON.stringify({ movies: newSavedMovies }),
          );

          const filteredMovies = moviesContext.movies.filter(
            (movieContext) => (movieContext?.id || movieContext?.movieId) !== response.data.movieId,
          );
          const concatedMovies = [response.data].concat(filteredMovies);
          moviesContext.setMovies(concatedMovies);
          setLikedMoviesId(likedMoviesId.concat([response.data]));
        })
        .catch((error) => {
          appContext.setLoading(false);
          toast.error(`Произошла ошибка при установке лайка! ${error}`, { icon: '❌' });
        });
    }
  };

  return {
    moviesToShow,
    setMoviesToShow,
    startPosition,
    setStartPosition,
    moreBtnVisible,
    setMoreBtnVisilble,
    onLikeClick,
    onDeleteClick,
    showMore,
    resolveMoviesList,
    likedMoviesId,
    setLikedMoviesId,
    moviesContext,
    appContext,
  };
}

export default useMoviesCardList;
