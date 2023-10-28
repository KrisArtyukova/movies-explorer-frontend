import React from 'react';
import './SearchForm.css';
import toast from 'react-hot-toast';
import moviesApi from '../../utils/MoviesApi';
import AppContext from '../../contexts/AppContext';
import MoviesContext from '../../contexts/MoviesContext';

function moviesFilter(movies, movieName, isShortName) {
  const filterByMovieName = movies.filter(
    (movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()),
  );

  if (isShortName) {
    return filterByMovieName.filter((movie) => movie.duration < 60);
  }

  return filterByMovieName;
}

function SearchForm() {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);

  const getMovies = ({ movieName, isShortFilm }) => {
    appContext.setLoading(true);
    moviesApi.getMovies()
      .then((response) => {
        appContext.setLoading(false);
        moviesContext.setMovies(moviesFilter(response, movieName, isShortFilm));
      })
      .catch((error) => {
        appContext.setLoading(false);
        toast.error(`Произошла ошибка при получении фильмов! ${error}`, { icon: '❌' });
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      movieName: event.target?.movieName?.value,
      isShortFilm: event.target?.isShortFilm?.checked,
    };

    getMovies(formValues);
  };

  return (
    <section className="search">
      <form className="search__container" onSubmit={handleFormSubmit}>
        <div className="search__form">
          <div className="search__form-cont">
            <input required className="search__form_input" name="movieName" type="text" placeholder="Фильм" />
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
