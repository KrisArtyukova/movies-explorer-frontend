import React from 'react';
import './AboutMe.css';
import BlockTitle from '../BlockTitle/BlockTitle';
import photo from '../../images/me.jpg';

function AboutMe() {
  return (
    <article className="me">
      <BlockTitle title="Студент" />
      <div className="me__info">
        <div className="me__info_text">
          <h2 className="me__info_text_title">Кристина</h2>
          <h3 className="me__info_text_subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="me__info_text_description">
            Родилась и живу в Наро-фоминске.
            7 лет работала в компании Икеа, после их ухода из России решила плотнее
            заняться изучением веб-разработки.
            Ранее проходила курсы по Веб-дизайну и верстке. Cейчас беру заказы на фрилансе.
            В свободное время смотрю сериалы, занимаюсь бегом, танцами и воспитываю своих собак.
          </p>
          <a href="https://github.com/KrisArtyukova" className="me__info_text_github">GitHub</a>
        </div>
        <img src={photo} alt="Фотография" className="me__photo" />
      </div>
    </article>
  );
}

export default AboutMe;
