import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__container">
        <div className="search__form">
          <div className="search__form-cont">
            <input required className="search__form_input" placeholder="Фильм" />
          </div>
          <button className="search__form_button" type="button">Найти</button>
        </div>
        <div className="switch">
          <label className="switch__label" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" className="checkbox" />
            <span className="switch__label_slider" />
          </label>
          <p className="switch__text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
