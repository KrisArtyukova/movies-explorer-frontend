import { MoviesPage, SavedMoviesState } from './constants';

export function getTimeFromMinutes(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
}

export function moviesFilter(movies, movieName, isShortName, page) {
  const ShortFilmDuration = 40;

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
