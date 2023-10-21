import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__project">
        <li className="portfolio__project_item">
          <a href="#" className="portfolio__project_link">Статичный сайт</a>
          <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
        </li>
        <li className="portfolio__project_item">
          <a href="#" className="portfolio__project_link">Адаптивный сайт</a>
          <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
        </li>
        <li className="portfolio__project_item">
          <a href="#" className="portfolio__project_link">Одностраничное приложение</a>
          <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
