import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__project">
        <li className="portfolio__project_item">
          <a className="portfolio__project_link" href="https://krisartyukova.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <h1 className="portfolio__project_label">Статичный сайт</h1>
            <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
          </a>
        </li>
        <li className="portfolio__project_item">
          <a className="portfolio__project_link" href="https://krisartyukova.github.io/travel-to-russia/" target="_blank" rel="noreferrer">
            <h1 className="portfolio__project_label">Адаптивный сайт</h1>
            <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
          </a>
        </li>
        <li className="portfolio__project_item">
          <a className="portfolio__project_link" href="https://krisartyukova.github.io/mesto/" target="_blank" rel="noreferrer">
            <h1 className="portfolio__project_label">Одностраничное приложение</h1>
            <img src={arrow} alt="Стрелка" className="portfolio__project_img" />
          </a>
        </li>

      </ul>
    </section>
  );
}

export default Portfolio;
