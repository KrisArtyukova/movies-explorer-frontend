import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import AccountButton from '../AccountButton/AccountButton';
import AppContext from '../../contexts/AppContext';

export const HeaderView = {
  Authorized: 'Authorized',
  NotAuthorized: 'NotAuthorized',
};

export const ColorMode = {
  Dark: 'Dark',
  Light: 'Light',
};

function FullSizeHeaderMenu() {
  return (
    <>
      <div className="header__navigation-container">
        <Link to="/movies" className="header__navigation-container_films" aria-label="Фильмы">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="header__navigation-container_saved" aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </Link>
      </div>
      <AccountButton />
    </>
  );
}

function HeaderBurger() {
  const appContext = React.useContext(AppContext);

  return (
    <button type="button" className="header__burger" onClick={() => appContext.setSiderIsOpen(true)} />
  );
}

function Header({ headerView, colorMode }) {
  const [content, setContent] = useState(null);
  let headerMainClass = '';
  const mediaQueryList768 = window.matchMedia('(max-width: 768px)');

  function handleResize() {
    if (mediaQueryList768.matches) {
      setContent(<HeaderBurger />);
    } else {
      setContent(<FullSizeHeaderMenu />);
    }
  }

  useEffect(() => {
    switch (headerView) {
      case HeaderView.Authorized:
        if (mediaQueryList768.matches) {
          setContent(<HeaderBurger />);
        } else {
          setContent(<FullSizeHeaderMenu />);
        }
        break;
      case HeaderView.NotAuthorized:
        setContent(
          <nav className="header__btn">
            <Link to="/signup" className="header__btn-reg" aria-label="Регистрация">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn-in" aria-label="Войти">
              Войти
            </Link>
          </nav>,
        );
        break;
      default:
        setContent(null);
        break;
    }
    if (headerView === HeaderView.Authorized) window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => () => {
    window.removeEventListener('resize', handleResize);
  }, []);

  switch (colorMode) {
    case ColorMode.Dark:
      headerMainClass = 'header header_dark';
      break;
    case ColorMode.Light:
      headerMainClass = 'header header_light';
      break;
    default:
      headerMainClass = '';
      break;
  }

  return (
    <header className={headerMainClass}>
      <div className="header__container">
        <Link to="/" className="header__link_container"><img src={logo} className="header__logo" alt="Логотип" /></Link>
        {content}
      </div>
    </header>
  );
}

export default Header;
