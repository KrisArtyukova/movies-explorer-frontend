import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';
import { MAIN_PAGE } from '../../utils/constants';

function Error() {
  return (
    <section className="error">
      <div className="error__message">
        <h1 className="error__message_title">404</h1>
        <p className="error__message_description">Страница не найдена</p>
      </div>
      <div className="error__btn">
        <Link to={MAIN_PAGE} className="error__btn_back">Назад</Link>
      </div>
    </section>
  );
}

export default Error;
