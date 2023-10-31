import React from 'react';
import toast from 'react-hot-toast';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import { MoviesPage, SAVED_MOVIES_STATE, SavedSearch } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';
import { moviesFilter } from '../../utils/utils';

function useSearchForm({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      movieName: event.target?.movieName?.value,
      isShortFilm: event.target?.isShortFilm?.checked,
    };

    localStorage.setItem(SavedSearch, JSON.stringify(formValues));

    getMovies(formValues);
  };

  const handleCheckboxChange = (event) => {
    const savedSearch = localStorage.getItem(SavedSearch);
    const parsedSavedSearch = JSON.parse(savedSearch);

    if (savedSearch === '' || savedSearch === null) {
      const defaultFormValues = { movieName: '', isShortFilm: event.target.checked };
      localStorage.setItem(SavedSearch, JSON.stringify(defaultFormValues));
      getMovies(defaultFormValues);
      return;
    }

    const formValues = {
      movieName: parsedSavedSearch.movieName,
      isShortFilm: event.target.checked,
    };

    localStorage.setItem(SavedSearch, JSON.stringify(formValues));

    getMovies(formValues);
  };

  return {
    moviesContext,
    appContext,
    getMovies,
    handleFormSubmit,
    handleCheckboxChange,
  };
}

export default useSearchForm;
