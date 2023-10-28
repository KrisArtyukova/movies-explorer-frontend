import React from 'react';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesCardList from '../../Components/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { MoviesPage } from '../../utils/constants';

function SavedMovies() {
  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="saved__movies">
        <SearchForm />
        <MoviesCardList page={MoviesPage.SavedMovies} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
