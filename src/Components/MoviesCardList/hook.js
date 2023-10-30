import React, { useState } from 'react';
import toast from 'react-hot-toast';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import { MoviesPage, SavedMoviesState } from '../../utils/constants';
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

  const handleLikeClick = (movieId) => {
    const savedMoviesState = localStorage.getItem(SavedMoviesState);
    if (savedMoviesState === '') return [movieId];
    if (savedMoviesState === null) return [movieId];

    if (page === MoviesPage.Movies) {
      const filteredMovies = JSON.parse(savedMoviesState)
        .moviesId.filter((movieIdState) => movieIdState !== movieId);
      setLikedMoviesId(
        likedMoviesId.includes(movieId)
          ? likedMoviesId.filter((likedId) => likedId !== movieId)
          : likedMoviesId.concat([movieId]),
      );
      return filteredMovies.concat([movieId]);
    }

    moviesContext.setMovies(moviesToShow.filter((movie) => movieId !== movie.id));
    setMoviesToShow(moviesToShow.filter((movie) => movieId !== movie.id));
    setLikedMoviesId(likedMoviesId.filter((likedMovieId) => likedMovieId !== movieId));
    return JSON.parse(savedMoviesState).moviesId.filter((movieIdState) => movieIdState !== movieId);
  };

  const onLikeClick = (_id, movieId, isDeleteLike) => {
    if (isDeleteLike) {
      if (movieId) {
        appContext.setLoading(true);
        moviesApi.getSavedMovies()
          .then((response) => {
            const savedMovies = response.data;
            const savedMovie = savedMovies.find((sM) => sM.movieId === movieId);
            if (savedMovie) {
              moviesApi.deleteMovie(savedMovie._id)
                .then(() => {
                  appContext.setLoading(false);
                  localStorage.setItem(
                    SavedMoviesState,
                    JSON.stringify({ moviesId: handleLikeClick(movieId) }),
                  );
                })
                .catch((error) => {
                  appContext.setLoading(false);
                  toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
                });
            }

            appContext.setLoading(false);
            localStorage.setItem(
              SavedMoviesState,
              JSON.stringify({ moviesId: handleLikeClick(movieId) }),
            );
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
          });
      } else {
        moviesApi.deleteMovie(_id)
          .then(() => {
            moviesApi.getSavedMovies()
              .then((response) => {
                appContext.setLoading(false);
                appContext.setMoviesError(undefined);
                localStorage.setItem(
                  SavedMoviesState,
                  JSON.stringify({ moviesId: response.data.map((movie) => movie.movieId) }),
                );
                moviesContext.setMovies(moviesFilter(response.data, '', false, page));
              })
              .catch((error) => {
                appContext.setLoading(false);
                appContext.setMoviesError(error);
                toast.error(`Произошла ошибка при получении сохранённых фильмов! ${error}`, { icon: '❌' });
              });
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
          });
      }
    } else {
      const likedMovie = moviesToShow.find((movie) => movie.id === movieId);
      if (likedMovie) {
        appContext.setLoading(true);
        moviesApi.createMovie({
          movieId,
          country: likedMovie.country,
          description: likedMovie.description,
          duration: likedMovie.duration,
          trailerLink: likedMovie.trailerLink,
          image: likedMovie.image.url,
          director: likedMovie.director,
          nameRU: likedMovie.nameRU,
          year: likedMovie.year,
          nameEN: likedMovie.nameEN,
          thumbnail: likedMovie.image.formats.thumbnail.url,
        })
          .then(() => {
            appContext.setLoading(false);
            localStorage.setItem(
              SavedMoviesState,
              JSON.stringify({ moviesId: handleLikeClick(movieId) }),
            );
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при установке лайка! ${error}`, { icon: '❌' });
          });
      }
    }
  };

  return {
    moviesToShow,
    setMoviesToShow,
    startPosition,
    setStartPosition,
    moreBtnVisible,
    setMoreBtnVisilble,
    handleLikeClick,
    onLikeClick,
    showMore,
    resolveMoviesList,
    likedMoviesId,
    setLikedMoviesId,
    moviesContext,
    appContext,
  };
}

export default useMoviesCardList;
