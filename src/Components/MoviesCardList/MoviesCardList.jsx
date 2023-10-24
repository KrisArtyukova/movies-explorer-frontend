import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import { MoviesPage } from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ page }) {
  const [cardData, setCardData] = useState([]);
  const cardData16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const cardData8 = [1, 2, 3, 4, 5, 6, 7, 8];
  const cardData5 = [1, 2, 3, 4, 5];
  const mediaQueryList320to768 = window.matchMedia('(min-width: 321px) and (max-width: 768px)');
  const mediaQueryList320 = window.matchMedia('(max-width: 320px)');

  function handleResize() {
    if (page === MoviesPage.SavedMovies) {
      setCardData(cardData5);
    } else if (mediaQueryList320to768.matches) {
      setCardData(cardData8);
    } else if (mediaQueryList320.matches) {
      setCardData(cardData5);
    } else {
      setCardData(cardData16);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => () => {
    window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="cards">
      <ul className="cards__container">
        {cardData.map(() => <MoviesCard title="Название" page={page} />)}
      </ul>
      <div className="cards__more">
        <button type="button" className="cars__more_btn">Еще</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
