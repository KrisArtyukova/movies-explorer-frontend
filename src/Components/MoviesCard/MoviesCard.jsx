import React from 'react';
import './MoviesCard.css';
import card from '../../images/card_img.png';
import like from '../../images/heart_red.svg';
import deleteImg from '../../images/delete.svg';
import { MoviesPage } from '../../utils/constants';

function MoviesCard({ title, page }) {
  let img;
  switch (page) {
    case MoviesPage.SavedMovies:
      img = deleteImg;
      break;
    case MoviesPage.Movies:
      img = like;
      break;
    default:
      break;
  }

  return (
    <article className="card">
      <img src={card} className="card__img" alt="Постер фильма" />
      <div className="card__description">
        <h1 className="card__description_text">{title}</h1>
        <button type="button" className="card__description_like"><img src={img} alt="Лайк" /></button>
      </div>
      <p className="card__duration">1ч42м</p>
    </article>
  );
}

export default MoviesCard;
