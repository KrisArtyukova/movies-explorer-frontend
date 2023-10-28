import React from 'react';
import './NavTab.css';
import BlockTitle from '../BlockTitle/BlockTitle';

function NavTab() {
  return (
    <section className="nav">
      <BlockTitle title="О проекте" />
      <ul className="nav__text">
        <li className="nav__text_item">
          <h3 className="nav__text_item-title">Дипломный проект включал 5 этапов</h3>
          <p className="nav__text_item-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="nav__text_item">
          <h3 className="nav__text_item-title">На выполнение диплома ушло 5 недель</h3>
          <p className="nav__text_item-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="nav__time">
        <div className="nav__time_green">
          <p className="nav__time-text">1 неделя</p>
        </div>
        <div className="nav__time_gray">
          <p className="nav__time-text">4 недели</p>
        </div>
      </div>
      <div className="nav__description">
        <p className="nav__description-backend">Back-end</p>
        <p className="nav__description-frontend">Front-end</p>
      </div>
    </section>
  );
}

export default NavTab;
