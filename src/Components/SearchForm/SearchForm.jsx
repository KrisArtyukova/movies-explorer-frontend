import React, { useEffect } from 'react';
import './SearchForm.css';
import { MoviesPage, SavedSearch } from '../../utils/constants';
import useSearchForm from './hook';

function SearchForm({ page }) {
  const {
    handleFormSubmit, getMovies,
  } = useSearchForm({ page });

  useEffect(() => {
    const savedSearch = localStorage.getItem(SavedSearch);
    if (page === MoviesPage.SavedMovies || savedSearch === '' || savedSearch === null) {
      getMovies({ movieName: '', isShortFilm: false });
      return;
    }

    const parsedSavedSearch = JSON.parse(savedSearch);
    document.getElementById('movieName').value = parsedSavedSearch.movieName;
    document.getElementById('checkbox').checked = parsedSavedSearch.isShortFilm;
    getMovies(JSON.parse(savedSearch));
  }, []);

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleFormSubmit}>
        <div className="search__form">
          <div className="search__form-cont">
            <input required className="search__form_input" id="movieName" name="movieName" type="text" placeholder="Фильм" />
          </div>
          <button className="search__form_button" type="submit">Найти</button>
        </div>
        <div className="switch">
          <label className="switch__label" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" name="isShortFilm" className="checkbox" />
            <span className="switch__label_slider" />
          </label>
          <p className="switch__text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
