import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">© 2023 </p>
        <nav className="footer__btn">
          <a href="https://practicum.yandex.ru/frontend-developer/?from=catalog" className="footer__btn-yp" target="_blank" type="button" aria-label="Яндекс.Практикум" rel="noreferrer">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/KrisArtyukova" className="footer__btn-gh" target="_blank" type="button" aria-label="GitHub" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
