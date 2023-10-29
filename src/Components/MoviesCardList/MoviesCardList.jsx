import React, {
  useCallback, useEffect, useState,
} from 'react';
import './MoviesCardList.css';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesContext from '../../contexts/MoviesContext';
import NotFound from '../NotFound/NotFound';
import { MoviesPage, SavedMoviesState } from '../../utils/constants';
import AppContext from '../../contexts/AppContext';
import moviesApi from '../../utils/MoviesApi';
import { moviesFilter } from '../SearchForm/SearchForm';

const countOfMoviesToShowForFullSize = 16;
const countOfMoviesToShowForMiddleSize = 8;
const countOfMoviesToShowForSmallSize = 5;

const resolveLiked = () => {
  const savedMoviesState = localStorage.getItem(SavedMoviesState);
  if (savedMoviesState === '') return [];
  if (savedMoviesState === null) return [];
  return JSON.parse(savedMoviesState).moviesId;
};

function MoviesCardList({ page }) {
  const moviesContext = React.useContext(MoviesContext);
  const appContext = React.useContext(AppContext);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [startPosition, setStartPosition] = useState(0);
  const [moreBtnVisible, setMoreBtnVisilble] = useState(false);
  const [likedMoviesId, setLikedMoviesId] = useState([]);
  const mediaQueryList427to768 = window.matchMedia('(min-width: 427px) and (max-width: 768px)');
  const mediaQueryList426 = window.matchMedia('(max-width: 426px)');

  useEffect(() => {
    if (moviesContext.movies.length) setLikedMoviesId(resolveLiked());
  }, [moviesContext.movies]);

  function resolveMoviesList() {
    if (mediaQueryList427to768.matches) {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForMiddleSize);
      setStartPosition(countOfMoviesToShowForMiddleSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForMiddleSize);
    } else if (mediaQueryList426.matches) {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForSmallSize);
      setStartPosition(countOfMoviesToShowForSmallSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForSmallSize);
    } else {
      const movies = moviesContext.movies.slice(0, countOfMoviesToShowForFullSize);
      setStartPosition(countOfMoviesToShowForFullSize);
      setMoviesToShow(movies);
      setMoreBtnVisilble(movies.length === countOfMoviesToShowForFullSize);
    }
  }

  useEffect(() => {
    setMoreBtnVisilble(!!moviesContext.movies.length);
    if (moviesContext.movies.length) { resolveMoviesList(); } else { setMoviesToShow([]); }
  }, [moviesContext.movies]);

  const handleResize = useCallback(() => resolveMoviesList(), [moviesContext.movies]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => () => {
    window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const showMore = () => {
    if (mediaQueryList427to768.matches) {
      setMoviesToShow(
        moviesToShow.concat(
          moviesContext.movies.slice(
            startPosition,
            startPosition + countOfMoviesToShowForMiddleSize,
          ),
        ),
      );
      setStartPosition(startPosition + countOfMoviesToShowForMiddleSize);
    } else if (mediaQueryList426.matches) {
      setMoviesToShow(
        moviesToShow.concat(
          moviesContext.movies.slice(
            startPosition,
            startPosition + countOfMoviesToShowForSmallSize,
          ),
        ),
      );
      setStartPosition(startPosition + countOfMoviesToShowForSmallSize);
    } else {
      const additionalMovies = moviesContext.movies.slice(
        startPosition,
        startPosition + countOfMoviesToShowForFullSize,
      );
      setMoviesToShow(moviesToShow.concat(additionalMovies));
      setMoreBtnVisilble(additionalMovies.length === countOfMoviesToShowForFullSize);
      setStartPosition(startPosition + countOfMoviesToShowForFullSize);
    }
  };

  if (appContext.moviesError) return <NotFound error={appContext.moviesError} />;
  if (moviesToShow.length === 0) return <NotFound />;

  const handleLikeClick = (movieId) => {
    const savedMoviesState = localStorage.getItem(SavedMoviesState);
    if (savedMoviesState === '') return [movieId];
    if (savedMoviesState === null) return [movieId];

    if (page === MoviesPage.Movies) {
      const filteredMovies = JSON.parse(savedMoviesState)
        .moviesId.filter((movieIdState) => movieIdState !== movieId);
      setLikedMoviesId(
        likedMoviesId.includes(movieId)
          ? likedMoviesId.filter((likedId) => likedId !== movieId)
          : likedMoviesId.concat([movieId]),
      );
      return filteredMovies.concat([movieId]);
    }

    moviesContext.setMovies(moviesToShow.filter((movie) => movieId !== movie.id));
    setMoviesToShow(moviesToShow.filter((movie) => movieId !== movie.id));
    setLikedMoviesId(likedMoviesId.filter((likedMovieId) => likedMovieId !== movieId));
    return JSON.parse(savedMoviesState).moviesId.filter((movieIdState) => movieIdState !== movieId);
  };

  const onLikeClick = (_id, movieId, isDeleteLike) => {
    if (isDeleteLike) {
      if (movieId) {
        appContext.setLoading(true);
        moviesApi.getSavedMovies()
          .then((response) => {
            const savedMovies = response.data;
            const savedMovie = savedMovies.find((sM) => sM.movieId === movieId);
            if (savedMovie) {
              moviesApi.deleteMovie(savedMovie._id)
                .then(() => {
                  appContext.setLoading(false);
                  localStorage.setItem(
                    SavedMoviesState,
                    JSON.stringify({ moviesId: handleLikeClick(movieId) }),
                  );
                })
                .catch((error) => {
                  appContext.setLoading(false);
                  toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
                });
            }

            appContext.setLoading(false);
            localStorage.setItem(
              SavedMoviesState,
              JSON.stringify({ moviesId: handleLikeClick(movieId) }),
            );
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
          });
      } else {
        moviesApi.deleteMovie(_id)
          .then(() => {
            moviesApi.getSavedMovies()
              .then((response) => {
                appContext.setLoading(false);
                appContext.setMoviesError(undefined);
                localStorage.setItem(
                  SavedMoviesState,
                  JSON.stringify({ moviesId: response.data.map((movie) => movie.movieId) }),
                );
                moviesContext.setMovies(moviesFilter(response.data, '', false, page));
              })
              .catch((error) => {
                appContext.setLoading(false);
                appContext.setMoviesError(error);
                toast.error(`Произошла ошибка при получении сохранённых фильмов! ${error}`, { icon: '❌' });
              });
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при удалении лайка! ${error}`, { icon: '❌' });
          });
      }
    } else {
      const likedMovie = moviesToShow.find((movie) => movie.id === movieId);
      if (likedMovie) {
        appContext.setLoading(true);
        moviesApi.createMovie({
          movieId,
          country: likedMovie.country,
          description: likedMovie.description,
          duration: likedMovie.duration,
          trailerLink: likedMovie.trailerLink,
          image: likedMovie.image.url,
          director: likedMovie.director,
          nameRU: likedMovie.nameRU,
          year: likedMovie.year,
          nameEN: likedMovie.nameEN,
          thumbnail: likedMovie.image.formats.thumbnail.url,
        })
          .then(() => {
            appContext.setLoading(false);
            localStorage.setItem(
              SavedMoviesState,
              JSON.stringify({ moviesId: handleLikeClick(movieId) }),
            );
          })
          .catch((error) => {
            appContext.setLoading(false);
            toast.error(`Произошла ошибка при установке лайка! ${error}`, { icon: '❌' });
          });
      }
    }
  };

  return (
    <section className="cards">
      <ul className="cards__container">
        {moviesToShow?.map((movie) => (
          <MoviesCard
            title={movie.nameRU}
            page={page}
            imgAlt={movie.description}
            image={page === MoviesPage.Movies ? movie.image.url : movie.image}
            trailerLink={movie.trailerLink}
            duration={movie.duration}
            key={uuidv4()}
            onLikeClick={onLikeClick}
            movieId={movie.id}
            likedMoviesId={likedMoviesId}
            _id={page === MoviesPage.Movies ? undefined : movie?._id}
          />
        )) }
      </ul>
      {moreBtnVisible ? (
        <div className="cards__more">
          <button type="button" className="cars__more_btn" onClick={showMore}>Еще</button>
        </div>
      ) : null}
    </section>
  );
}

export default MoviesCardList;
