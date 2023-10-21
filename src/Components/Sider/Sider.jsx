import React from 'react';
import './Sider.css';
import AccountButton from '../AccountButton/AccountButton';
import AppContext from '../../contexts/AppContext';

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
            <button type="button" className="sider__content__menu-container__links__link">Главная</button>
            <button type="button" className="sider__content__menu-container__links__link">Фильмы</button>
            <button type="button" className="sider__content__menu-container__links__link">Сохранённые фильмы</button>
          </div>
          <AccountButton />
        </div>
      </div>
    </div>
  );
}

export default Sider;
