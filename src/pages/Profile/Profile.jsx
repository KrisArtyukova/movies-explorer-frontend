import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';

function Profile() {
  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <section className="profile__section">
          <form className="profile__form">
            <div className="profile__form_container">
              <input minLength="3" maxLength="10" required id="profileName" placeholder="Имя" type="text" className="profile__form_container-input" />
              <label htmlFor="profileName" className="profile__form_container-span">Виталий</label>
            </div>
            <div className="profile__form_container profile__form_container_bottom">
              <input required id="profileEmail" placeholder="E-mail" type="email" className="profile__form_container-input" />
              <label htmlFor="profileEmail" className="profile__form_container-span">pochta@yandex.ru</label>
            </div>
            <div className="profile__btn">
              <button className="profile__btn_edit" type="button">Редактировать</button>
              <Link to="/" className="profile__btn_exit">Выйти из аккаунта</Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
