import React from 'react';
import './MoviesCard.css';
import like from '../../images/heart_red.svg';
import deleteImg from '../../images/delete.svg';
import { MoviesPage } from '../../utils/constants';
import getTimeFromMinutes from '../../utils/utils';

function MoviesCard({
  title, page, imgAlt, image, duration, trailerLink,
}) {
  let btnImg;
  switch (page) {
    case MoviesPage.SavedMovies:
      btnImg = deleteImg;
      break;
    case MoviesPage.Movies:
      btnImg = like;
      break;
    default:
      break;
  }

  return (
    <li className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${image}`} className="card__img" alt={imgAlt} />
      </a>
      <div className="card__description">
        <h2 className="card__description_text">{title}</h2>
        <button type="button" className="card__description_like"><img src={btnImg} alt="Лайк" /></button>
      </div>
      <p className="card__duration">{getTimeFromMinutes(duration)}</p>
    </li>
  );
}

export default MoviesCard;
