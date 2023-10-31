import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import activeLike from '../../images/heart_red.svg';
import disablelike from '../../images/heart_gray.svg';
import deleteImg from '../../images/delete.svg';
import { MoviesPage } from '../../utils/constants';
import { getTimeFromMinutes } from '../../utils/utils';

function ResolveImg({ page, isLiked }) {
  if (page === MoviesPage.SavedMovies) return <img src={deleteImg} alt="Лайк" />;
  if (isLiked) {
    return <img src={activeLike} alt="Лайк" />;
  }
  return <img src={disablelike} alt="Лайк" />;
}

function MoviesCard({
  _id,
  title,
  page,
  imgAlt,
  image,
  duration,
  trailerLink,
  onLikeClick,
  onDeleteClick,
  likedMoviesId,
  movieId,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (likedMoviesId.length) {
      setIsLiked(_id && likedMoviesId.some((likedMovie) => likedMovie._id === _id));
    }
  }, [likedMoviesId]);

  function handleLikeClick() {
    onLikeClick(movieId);
  }

  function handleDeleteClick() {
    onDeleteClick(_id);
  }

  return (
    <li className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${image}`} className="card__img" alt={imgAlt} />
      </a>
      <div className="card__description">
        <h2 className="card__description_text">{title}</h2>
        <button type="button" className="card__description_like" onClick={isLiked ? handleDeleteClick : handleLikeClick}><ResolveImg page={page} isLiked={isLiked} /></button>
      </div>
      <p className="card__duration">{getTimeFromMinutes(duration)}</p>
    </li>
  );
}

export default MoviesCard;
