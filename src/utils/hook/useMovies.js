import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { MoviesPage, SAVED_MOVIES_STATE, SAVED_SEARCH_SAVED_MOVIE } from '../constants';
import moviesApi from '../MoviesApi';
import { moviesFilter } from '../utils';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';

function useMovies({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [likedMoviesId, setLikedMoviesId] = useState([]);

  const getMovies = ({ movieName, isShortFilm }) => {
    appContext.setLoading(true);
    if (page === MoviesPage.Movies) {
      moviesApi.getMoviesBeatFilm()
        .then((responseBeats) => {
          moviesApi.getSavedMovies()
            .then((savedMoviesData) => {
              const savedMovies = savedMoviesData.data;
              appContext.setLoading(false);
              appContext.setMoviesError(undefined);
              localStorage.setItem(
                SAVED_MOVIES_STATE,
                JSON.stringify({ movies: savedMovies }),
              );
              const filteredMovies = responseBeats
                .filter((responseBeat) => !savedMovies
                  .some((savedMovie) => savedMovie.movieId === responseBeat.id));
              const concatMovies = savedMovies.concat(filteredMovies);

              moviesContext.setMovies(moviesFilter(concatMovies, movieName, isShortFilm, page));
            })
            .catch(() => {});
        })
        .catch((error) => {
          appContext.setLoading(false);
          appContext.setMoviesError(error);
          toast.error(`Произошла ошибка при получении фильмов! ${error}`, { icon: '❌' });
        });
    } else {
      moviesApi.getSavedMovies()
        .then((response) => {
          appContext.setLoading(false);
          appContext.setMoviesError(undefined);
          localStorage.setItem(
            SAVED_MOVIES_STATE,
            JSON.stringify({ movies: response.data }),
          );
          moviesContext.setMovies(moviesFilter(response.data, movieName, isShortFilm, page));
        })
        .catch((error) => {
          appContext.setLoading(false);
          appContext.setMoviesError(error);
          toast.error(`Произошла ошибка при получении сохранённых фильмов! ${error}`, { icon: '❌' });
        });
    }
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
          const savedSearchSavedMovie = localStorage.getItem(SAVED_SEARCH_SAVED_MOVIE);
          if (savedSearchSavedMovie === '' || savedSearchSavedMovie === null) {
            moviesContext.setMovies(moviesFilter(newSavedMovies, '', false, page));
            return;
          }
          const parsedSavedSearch = JSON.parse(savedSearchSavedMovie);
          moviesContext.setMovies(
            moviesFilter(
              newSavedMovies,
              parsedSavedSearch.movieName,
              parsedSavedSearch.isShortFilm,
              page,
            ),
          );
        }
        setLikedMoviesId(newSavedMovies);
      })
      .catch((error) => {
        appContext.setLoading(false);
        appContext.setMoviesError(error);
        toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
      });
  };

  return {
    getMovies,
    onLikeClick,
    onDeleteClick,
    setMoviesToShow,
    moviesToShow,
    likedMoviesId,
    setLikedMoviesId,
  };
}

export default useMovies;
