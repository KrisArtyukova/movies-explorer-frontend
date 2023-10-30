import React from 'react';
import toast from 'react-hot-toast';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import { MoviesPage, SavedMoviesState, SavedSearch } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';
import { moviesFilter } from '../../utils/utils';

function useSearchForm({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);

  const getMovies = ({ movieName, isShortFilm }) => {
    appContext.setLoading(true);
    if (page === MoviesPage.Movies) {
      moviesApi.getSavedMovies()
        .then((response) => {
          localStorage.setItem(
            SavedMoviesState,
            JSON.stringify({ moviesId: response.data.map((movie) => movie.movieId) }),
          );
          moviesApi.getMoviesBeatFilm()
            .then((responseBeat) => {
              appContext.setLoading(false);
              appContext.setMoviesError(undefined);
              moviesContext.setMovies(moviesFilter(responseBeat, movieName, isShortFilm, page));
            })
            .catch((error) => {
              appContext.setLoading(false);
              appContext.setMoviesError(error);
              toast.error(`Произошла ошибка при получении фильмов! ${error}`, { icon: '❌' });
            });
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
            SavedMoviesState,
            JSON.stringify({ moviesId: response.data.map((movie) => movie.movieId) }),
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      movieName: event.target?.movieName?.value,
      isShortFilm: event.target?.isShortFilm?.checked,
    };

    localStorage.setItem(SavedSearch, JSON.stringify(formValues));

    getMovies(formValues);
  };

  return {
    moviesContext,
    appContext,
    getMovies,
    handleFormSubmit,
  };
}

export default useSearchForm;
