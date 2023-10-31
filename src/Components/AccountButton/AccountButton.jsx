import React from 'react';
import './AccountButton.css';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../utils/constants';

function AccountButton({ isDark }) {
  return isDark
    ? (
      <Link to={PROFILE} className="header__navigation_account-btn header__navigation_account-btn_dark">Аккаунт</Link>
    )
    : (
      <Link to={PROFILE} className="header__navigation_account-btn ">Аккаунт</Link>
    );
}

export default AccountButton;
