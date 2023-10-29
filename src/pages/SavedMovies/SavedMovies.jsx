import React, { useState } from 'react';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { MoviesPage } from '../../utils/constants';
import MoviesContext from '../../contexts/MoviesContext';

function SavedMovies() {
  const [movies, setMovies] = useState([]);

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className={movies.length > 4 ? 'saved__movies' : 'saved__movies__full'}>
        <MoviesContext.Provider value={{ movies, setMovies }}>
          <SearchForm page={MoviesPage.SavedMovies} />
          <MoviesCardList page={MoviesPage.SavedMovies} />
        </MoviesContext.Provider>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
