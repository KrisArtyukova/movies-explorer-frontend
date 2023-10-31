import React from 'react';
import MoviesContext from '../../contexts/MoviesContext';
import AppContext from '../../contexts/AppContext';
import {
  MoviesPage, SAVED_SEARCH_MOVIE, SAVED_SEARCH_SAVED_MOVIE,
} from '../../utils/constants';

function useSearchForm({ page, getMovies }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      movieName: event.target?.movieName?.value,
      isShortFilm: event.target?.isShortFilm?.checked,
    };
    if (page === MoviesPage.Movies) {
      localStorage.setItem(SAVED_SEARCH_MOVIE, JSON.stringify(formValues));
    }

    if (page === MoviesPage.SavedMovies) {
      localStorage.setItem(SAVED_SEARCH_SAVED_MOVIE, JSON.stringify(formValues));
    }
    getMovies(formValues);
  };

  const handleCheckboxChange = (event) => {
    const savedSearchMovie = localStorage.getItem(SAVED_SEARCH_MOVIE);
    const savedSearchSavedMovie = localStorage.getItem(SAVED_SEARCH_SAVED_MOVIE);
    const parsedMovieSearch = JSON.parse(savedSearchMovie);
    const parsedSavedMovieSearch = JSON.parse(savedSearchSavedMovie);
    const defaultFormValues = { movieName: '', isShortFilm: event.target.checked };

    if (page === MoviesPage.Movies) {
      if (savedSearchMovie === '' || savedSearchMovie === null) {
        localStorage.setItem(SAVED_SEARCH_MOVIE, JSON.stringify(defaultFormValues));
        getMovies(defaultFormValues);
        return;
      }
    } else if (page === MoviesPage.SavedMovies) {
      if (savedSearchSavedMovie === '' || savedSearchSavedMovie === null) {
        localStorage.setItem(SAVED_SEARCH_SAVED_MOVIE, JSON.stringify(defaultFormValues));
        getMovies(defaultFormValues);
        return;
      }
    }

    if (page === MoviesPage.Movies) {
      const formValues = {
        movieName: parsedMovieSearch.movieName,
        isShortFilm: event.target.checked,
      };
      localStorage.setItem(SAVED_SEARCH_MOVIE, JSON.stringify(formValues));
      getMovies(formValues);
    }

    if (page === MoviesPage.SavedMovies) {
      const formValues = {
        movieName: parsedSavedMovieSearch.movieName,
        isShortFilm: event.target.checked,
      };
      localStorage.setItem(SAVED_SEARCH_SAVED_MOVIE, JSON.stringify(formValues));
      getMovies(formValues);
    }
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
