import React, {
  useCallback, useEffect,
} from 'react';
import './MoviesCardList.css';
import { v4 as uuidv4 } from 'uuid';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFound from '../NotFound/NotFound';
import { MoviesPage, SavedMoviesState } from '../../utils/constants';
import useMoviesCardList from './hook';

const resolveLiked = () => {
  const savedMoviesState = localStorage.getItem(SavedMoviesState);
  if (savedMoviesState === '') return [];
  if (savedMoviesState === null) return [];
  return JSON.parse(savedMoviesState).moviesId;
};

function MoviesCardList({ page }) {
  const {
    setMoreBtnVisilble,
    moreBtnVisible,
    moviesToShow,
    setMoviesToShow,
    likedMoviesId,
    setLikedMoviesId,
    resolveMoviesList,
    showMore,
    onLikeClick,
    moviesContext,
    appContext,
  } = useMoviesCardList({ page });

  useEffect(() => {
    if (moviesContext.movies.length) setLikedMoviesId(resolveLiked());
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
