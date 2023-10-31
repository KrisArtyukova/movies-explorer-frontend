import React from 'react';
import './Sider.css';
import { Link } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton';
import AppContext from '../../contexts/AppContext';
import { MOVIES, SAVED_MOVIES } from '../../utils/constants';

function Sider() {
  const appContext = React.useContext(AppContext);
  if (!appContext.siderIsOpen) return null;

  return (
    <div className="sider">
      <div className="sider__content">
        <div className="sider__content__close-button-container">
          <button type="button" className="sider__content__close-button" onClick={() => appContext.setSiderIsOpen(false)} />
        </div>
        <div className="sider__content__menu-container">
          <div className="sider__content__menu-container__links">
            <Link to="/" className="sider__content__menu-container__links__link">Главная</Link>
            <Link to={MOVIES} className="sider__content__menu-container__links__link">Фильмы</Link>
            <Link to={SAVED_MOVIES} className="sider__content__menu-container__links__link">Сохранённые фильмы</Link>
          </div>
          <AccountButton />
        </div>
      </div>
    </div>
  );
}

export default Sider;
