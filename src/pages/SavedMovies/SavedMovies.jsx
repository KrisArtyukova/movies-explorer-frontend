import React from 'react';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { MoviesPage } from '../../utils/constants';

function SavedMovies() {
  return (
    <section className="saved__movies">
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <SearchForm />
      <MoviesCardList page={MoviesPage.SavedMovies} />
      <Footer />
    </section>
  );
}

export default SavedMovies;
