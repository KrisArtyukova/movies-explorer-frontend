import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';

function Profile() {
  return (
    <section className="profile">
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__form_container">
          <input placeholder="Имя" type="name" className="profile__form_container-input" />
          <span className="profile__form_container-span">Виталий</span>
        </div>
        <div className="profile__form_container-divider" />
        <div className="profile__form_container">
          <input placeholder="E-mail" type="email" className="profile__form_container-input" />
          <span className="profile__form_container-span">pochta@yandex.ru</span>
        </div>
      </form>
      <form className="profile__btn">
        <button className="profile__btn_edit" type="button">Редактировать</button>
        <Link to="/" className="profile__btn_exit" type="button">Выйти из аккаунта</Link>
      </form>
    </section>
  );
}

export default Profile;
