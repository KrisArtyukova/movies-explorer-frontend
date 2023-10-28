import React, { useState } from 'react';
import './Movies.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import { MoviesPage } from '../../utils/constants';
import MoviesContext from '../../contexts/MoviesContext';

function Movies() {
  const [movies, setMovies] = useState([]);

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="movies">
        <MoviesContext.Provider value={{ movies, setMovies }}>
          <SearchForm />
          <MoviesCardList page={MoviesPage.Movies} />
        </MoviesContext.Provider>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
