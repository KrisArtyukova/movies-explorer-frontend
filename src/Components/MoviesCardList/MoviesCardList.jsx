import React, { useCallback, useEffect } from 'react';
import './MoviesCardList.css';
import { v4 as uuidv4 } from 'uuid';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFound from '../NotFound/NotFound';
import useMoviesCardList from './hook';
import { SAVED_MOVIES_STATE } from '../../utils/constants';

function MoviesCardList({
  page, onLikeClick, setMoviesToShow, moviesToShow, setLikedMoviesId, likedMoviesId, onDeleteClick,
}) {
  const {
    setMoreBtnVisilble,
    moreBtnVisible,
    resolveMoviesList,
    showMore,
    moviesContext,
    appContext,
  } = useMoviesCardList({ setMoviesToShow, moviesToShow });

  useEffect(() => {
    if (moviesContext.movies.length) {
      const savedMoviesState = localStorage.getItem(SAVED_MOVIES_STATE);
      if (savedMoviesState === '' || savedMoviesState === null) {
        localStorage.setItem(
          SAVED_MOVIES_STATE,
          JSON.stringify({ movies: [] }),
        );
        setLikedMoviesId([]);
        return;
      }
      setLikedMoviesId(JSON.parse(savedMoviesState).movies);
    }
  }, [moviesContext.movies]);

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

  if (appContext.moviesError) return <NotFound error={appContext.moviesError} />;
  if (moviesToShow.length === 0) return <NotFound />;

  return (
    <section className="cards">
      <ul className="cards__container">
        {moviesToShow?.map((movie) => (
          <MoviesCard
            title={movie.nameRU}
            page={page}
            imgAlt={movie.description}
            image={movie?.image?.url || movie.image}
            trailerLink={movie.trailerLink}
            duration={movie.duration}
            key={uuidv4()}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movieId={movie.movieId ?? movie.id}
            likedMoviesId={likedMoviesId}
            _id={movie._id}
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
