import React from 'react';
import './Movies.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import { MoviesPage } from '../../utils/constants';

function Movies() {
  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList page={MoviesPage.Movies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
