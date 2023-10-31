import React from 'react';
import './NotFound.css';

function NotFound({ error }) {
  const text = error ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено';

  return (
    <div className="not-found">
      <p>{text}</p>
    </div>
  );
}

export default NotFound;
