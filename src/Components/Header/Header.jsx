import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import AccountButton from '../AccountButton/AccountButton';
import AppContext from '../../contexts/AppContext';
import {
  MAX_WIDTH_768,
  MOVIES, SAVED_MOVIES, SIGN_IN, SIGN_UP,
} from '../../utils/constants';

export const HeaderView = {
  Authorized: 'Authorized',
  NotAuthorized: 'NotAuthorized',
};

export const ColorMode = {
  Dark: 'Dark',
  Light: 'Light',
};

function FullSizeHeaderMenu({ colorMode }) {
  const location = useLocation();
  const classes = colorMode === ColorMode.Light ? 'header__navigation-container-links' : 'header__navigation-container-links-light';
  const modificators = colorMode === ColorMode.Light ? 'header__navigation-container-links-active' : 'header__navigation-container-links-light-active';
  let moviesLinkClass = classes;
  let savedMoviesLinkClass = classes;

  switch (location.pathname) {
    case MOVIES:
      moviesLinkClass = `${moviesLinkClass} ${modificators}`;
      break;
    case SAVED_MOVIES:
      savedMoviesLinkClass = `${moviesLinkClass} ${modificators}`;
      break;
    default:
      break;
  }

  return (
    <>
      <div className="header__navigation-container">
        <Link to={MOVIES} className={moviesLinkClass} aria-label="Фильмы">
          Фильмы
        </Link>
        <Link to={SAVED_MOVIES} className={savedMoviesLinkClass} aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </Link>
      </div>
      <AccountButton isDark={colorMode === ColorMode.Dark} />
    </>
  );
}

function HeaderBurger({ colorMode }) {
  const appContext = React.useContext(AppContext);
  const className = colorMode === ColorMode.Light ? 'header__burger' : 'header__burger_light';

  return (
    <button type="button" className={className} onClick={() => appContext.setSiderIsOpen(true)} />
  );
}

function Header({ headerView, colorMode }) {
  const [content, setContent] = useState(null);
  let headerMainClass = '';
  const mediaQueryList768 = window.matchMedia(MAX_WIDTH_768);

  function handleResize() {
    if (mediaQueryList768.matches) {
      setContent(<HeaderBurger colorMode={colorMode} />);
    } else {
      setContent(<FullSizeHeaderMenu colorMode={colorMode} />);
    }
  }

  useEffect(() => {
    switch (headerView) {
      case HeaderView.Authorized:
        if (mediaQueryList768.matches) {
          setContent(<HeaderBurger colorMode={colorMode} />);
        } else {
          setContent(<FullSizeHeaderMenu colorMode={colorMode} />);
        }
        break;
      case HeaderView.NotAuthorized:
        setContent(
          <nav className="header__btn">
            <Link to={SIGN_UP} className="header__btn-reg" aria-label="Регистрация">
              Регистрация
            </Link>
            <Link to={SIGN_IN} className="header__btn-in" aria-label="Войти">
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
