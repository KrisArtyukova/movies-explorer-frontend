import React, { useEffect } from 'react';
import './SearchForm.css';
import toast from 'react-hot-toast';
import moviesApi from '../../utils/MoviesApi';
import AppContext from '../../contexts/AppContext';
import MoviesContext from '../../contexts/MoviesContext';
import { MoviesPage, SavedMoviesState, SavedSearch } from '../../utils/constants';

const ShortFilmDuration = 40;

export function moviesFilter(movies, movieName, isShortName, page) {
  if (page === MoviesPage.SavedMovies) {
    const savedMoviesState = JSON.parse(localStorage.getItem(SavedMoviesState));
    if (savedMoviesState === '' || savedMoviesState === null) return [];
    const savedMovies = movies.filter((movie) => savedMoviesState.moviesId.includes(movie.movieId));

    const filterByMovieName = savedMovies.filter(
      (movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase().trim())
            || movie.nameEN.toLowerCase().includes(movieName.toLowerCase().trim()),
    );

    if (isShortName) {
      return filterByMovieName.filter((movie) => movie.duration <= ShortFilmDuration);
    }

    return filterByMovieName;
  }

  const filterByMovieName = movies.filter(
    (movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase().trim())
        || movie.nameEN.toLowerCase().includes(movieName.toLowerCase().trim()),
  );

  if (isShortName) {
    return filterByMovieName.filter((movie) => movie.duration <= ShortFilmDuration);
  }

  return filterByMovieName;
}

function SearchForm({ page }) {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      movieName: event.target?.movieName?.value,
      isShortFilm: event.target?.isShortFilm?.checked,
    };

    localStorage.setItem(SavedSearch, JSON.stringify(formValues));

    getMovies(formValues);
  };

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
