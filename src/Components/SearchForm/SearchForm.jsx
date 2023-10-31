import React, { useEffect } from 'react';
import './SearchForm.css';
import {
  CHECKBOX, MOVIE_NAME, MoviesPage, SAVED_SEARCH_MOVIE, SAVED_SEARCH_SAVED_MOVIE,
} from '../../utils/constants';
import useSearchForm from './hook';

function SearchForm({ page, getMovies }) {
  const {
    handleFormSubmit, handleCheckboxChange,
  } = useSearchForm({ page, getMovies });

  useEffect(() => {
    const savedSearchMovie = localStorage.getItem(SAVED_SEARCH_MOVIE);

    if (page === MoviesPage.Movies) {
      if (savedSearchMovie === '' || savedSearchMovie === null) {
        getMovies({ movieName: '', isShortFilm: false });
        return;
      }

      const parsedSavedSearch = JSON.parse(savedSearchMovie);
      document.getElementById(MOVIE_NAME).value = parsedSavedSearch.movieName;
      document.getElementById(CHECKBOX).checked = parsedSavedSearch.isShortFilm;
      getMovies(JSON.parse(savedSearchMovie));
    } else if (page === MoviesPage.SavedMovies) {
      const formValues = {
        movieName: '',
        isShortFilm: false,
      };
      localStorage.setItem(SAVED_SEARCH_SAVED_MOVIE, JSON.stringify(formValues));
      getMovies({ movieName: '', isShortFilm: false });
    }
  }, []);

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleFormSubmit}>
        <div className="search__form">
          <div className="search__form-cont">
            <input required className="search__form_input" id={MOVIE_NAME} name={MOVIE_NAME} type="text" placeholder="Фильм" />
          </div>
          <button className="search__form_button" type="submit">Найти</button>
        </div>
        <div className="switch">
          <label className="switch__label" htmlFor={CHECKBOX}>
            <input type={CHECKBOX} id={CHECKBOX} name="isShortFilm" className="checkbox" onChange={handleCheckboxChange} />
            <span className="switch__label_slider" />
          </label>
          <p className="switch__text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
