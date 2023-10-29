import React from 'react';
import './MoviesCard.css';
import activeLike from '../../images/heart_red.svg';
import disablelike from '../../images/heart_gray.svg';
import deleteImg from '../../images/delete.svg';
import { MoviesPage } from '../../utils/constants';
import getTimeFromMinutes from '../../utils/utils';

function MoviesCard({
  _id, title, page, imgAlt, image, duration, trailerLink, onLikeClick, movieId, likedMoviesId,
}) {
  let btnImg;
  switch (page) {
    case MoviesPage.SavedMovies:
      btnImg = deleteImg;
      break;
    case MoviesPage.Movies:
      btnImg = likedMoviesId.includes(movieId) ? activeLike : disablelike;
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
        <button type="button" className="card__description_like" onClick={() => onLikeClick(_id, movieId, _id ? !!_id : likedMoviesId.includes(movieId))}><img src={btnImg} alt="Лайк" /></button>
      </div>
      <p className="card__duration">{getTimeFromMinutes(duration)}</p>
    </li>
  );
}

export default MoviesCard;
