import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
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
    <div className="header__navigation">
      <div className="header__navigation-container">
        <Link to="/movies" className="header__navigation-container_films" type="button" aria-label="Фильмы">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="header__navigation-container_saved" type="button" aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </Link>
      </div>
      <AccountButton />
    </div>
  );
}

function HeaderBurger() {
  const appContext = React.useContext(AppContext);

  return (
    <button type="button" className="header__burger" onClick={() => appContext.setSiderIsOpen(true)} />
  );
}

function Header({ headerView, colorMode }) {
  let content = null;
  let headerMainClass = '';
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
  const mediaQueryList768 = window.matchMedia('(max-width: 768px)');

  switch (headerView) {
    case HeaderView.Authorized:
      content = mediaQueryList768.matches
        ? <HeaderBurger />
        : <FullSizeHeaderMenu />;
      break;
    case HeaderView.NotAuthorized:
      content = (
        <div className="header__btn">
          <Link to="/signup" className="header__btn-reg" aria-label="Регистрация">
            Регистрация
          </Link>
          <Link to="/signin" className="header__btn-in" aria-label="Войти">
            Войти
          </Link>
        </div>
      );
      break;
    default:
      content = null;
      break;
  }

  return (
    <header className={headerMainClass}>
      <Link to="/"><img src={logo} className="header__logo" alt="Логотип" /></Link>
      {content}
    </header>
  );
}

export default Header;
