import React from 'react';
import './AboutMe.css';
import BlockTitle from '../BlockTitle/BlockTitle';
import photo from '../../images/me.jpg';

function AboutMe() {
  return (
    <article className="me" id="readMore">
      <BlockTitle title="Студент" />
      <div className="me__info">
        <div className="me__info_text">
          <h3 className="me__info_text_title">Виталий</h3>
          <h3 className="me__info_text_subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="me__info_text_description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и&#160;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб&#8209;разработке,
            начал заниматься фриланс&#8209;заказами&#160;и ушёл с постоянной работы.
          </p>
          <a href="https://github.com/KrisArtyukova" target="_blank" className="me__info_text_github" rel="noreferrer">GitHub</a>
        </div>
        <img src={photo} alt="Фотография студента" className="me__photo" />
      </div>
    </article>
  );
}

export default AboutMe;
