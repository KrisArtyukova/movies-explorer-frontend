import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <main className="error">
      <div className="error__message">
        <h1 className="error__message_title">404</h1>
        <p className="error__message_description">Страница не найдена</p>
      </div>
      <div className="error__btn">
        <Link to="/" className="error__btn_back">Назад</Link>
      </div>
    </main>

  );
}``

export default Error;
