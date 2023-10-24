import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">© 2023 </p>
        <nav className="footer__btn">
          <button className="footer__btn-yp" type="button" aria-label="Яндекс.Практикум">
            Яндекс.Практикум
          </button>
          <button className="footer__btn-gh" type="button" aria-label="GitHub">
            GitHub
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
