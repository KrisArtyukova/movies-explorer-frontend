import React from 'react';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { MoviesPage } from '../../utils/constants';
import MoviesContext from '../../contexts/MoviesContext';
import useMovies from '../../utils/hook/useMovies';

function SavedMovies() {
  const moviesContext = React.useContext(MoviesContext);
  const {
    getMovies,
    onLikeClick,
    setMoviesToShow,
    likedMoviesId,
    setLikedMoviesId,
    moviesToShow,
    onDeleteClick,
  } = useMovies({ page: MoviesPage.SavedMovies });

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className={moviesContext.movies.length > 4 ? 'saved__movies' : 'saved__movies__full'}>
        <SearchForm page={MoviesPage.SavedMovies} getMovies={getMovies} />
        <MoviesCardList
          page={MoviesPage.SavedMovies}
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

export default SavedMovies;
