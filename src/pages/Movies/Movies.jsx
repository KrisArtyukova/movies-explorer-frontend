import React from 'react';
import './Movies.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import { MoviesPage } from '../../utils/constants';
import useMovies from '../../utils/hook/useMovies';
import MoviesContext from '../../contexts/MoviesContext';

function Movies() {
  const moviesContext = React.useContext(MoviesContext);
  const {
    getMovies,
    onLikeClick,
    setMoviesToShow,
    likedMoviesId,
    setLikedMoviesId,
    moviesToShow,
    onDeleteClick,
  } = useMovies({ page: MoviesPage.Movies });

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className={moviesContext.movies.length > 4 ? 'movies' : 'movieFull'}>
        <SearchForm page={MoviesPage.Movies} getMovies={getMovies} />
        <MoviesCardList
          page={MoviesPage.Movies}
          onLikeClick={onLikeClick}
          setMoviesToShow={setMoviesToShow}
          moviesToShow={moviesToShow}
          setLikedMoviesId={setLikedMoviesId}
          likedMoviesId={likedMoviesId}
          onDeleteClick={onDeleteClick}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
