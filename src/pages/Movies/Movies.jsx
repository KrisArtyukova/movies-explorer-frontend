import React from 'react';
import './Movies.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import { MoviesPage } from '../../utils/constants';

function Movies() {
  return (
    <section className="movies">
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <SearchForm />
      <MoviesCardList page={MoviesPage.Movies} />
      <Footer />
    </section>
  );
}

export default Movies;
