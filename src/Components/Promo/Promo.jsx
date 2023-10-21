import React from 'react';
import './Promo.css';
import HeroImg from '../../images/hero_img.png';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img src={HeroImg} className="promo__img" alt="Веб картинка" />
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <h3 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
          <button className="promo__btn" type="button" aria-label="Узнать больше">
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  );
}

export default Promo;
