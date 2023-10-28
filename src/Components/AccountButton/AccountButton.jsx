import React from 'react';
import './AccountButton.css';
import { Link } from 'react-router-dom';

function AccountButton({ isDark }) {
  return isDark
    ? (
      <Link to="/profile" className="header__navigation_account-btn header__navigation_account-btn_dark">Аккаунт</Link>
    )
    : (
      <Link to="/profile" className="header__navigation_account-btn ">Аккаунт</Link>
    );
}

export default AccountButton;
