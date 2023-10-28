import React from 'react';
import './Profile.css';
import toast from 'react-hot-toast';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AppContext from '../../contexts/AppContext';
import mainApi from '../../utils/MainApi';

function Profile({ logout }) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const appContext = React.useContext(AppContext);

  function onEditUserInfo({ name, email }) {
    appContext.setLoading(true);
    mainApi.editUserInfo({ name, email })
      .then((response) => {
        currentUserContext.setCurrentUser(response.user);
        appContext.setLoading(false);
        toast.success('Вы успешно изменили данные!', { icon: '✅' });
      })
      .catch((error) => {
        appContext.setLoading(false);
        toast.error(`Произошла ошибка при изменении данных пользователя! ${error}`, { icon: '❌' });
      });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      name: event.target?.profileName?.value,
      email: event.target?.profileEmail?.value,
    };

    onEditUserInfo(formValues);
  };

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="profile">
        <h1 className="profile__title">{`Привет, ${currentUserContext?.currentUser?.name}`}</h1>
        <section className="profile__section">
          <form className="profile__form" onSubmit={handleFormSubmit}>
            <div className="profile__form_container">
              <input minLength="3" maxLength="10" required id="profileName" placeholder="Имя" type="text" className="profile__form_container-input" />
              <label htmlFor="profileName" className="profile__form_container-span">{currentUserContext?.currentUser?.name}</label>
            </div>
            <div className="profile__form_container profile__form_container_bottom">
              <input required id="profileEmail" placeholder="E-mail" type="email" className="profile__form_container-input" />
              <label htmlFor="profileEmail" className="profile__form_container-span">{currentUserContext?.currentUser.email}</label>
            </div>
            <div className="profile__btn">
              <button className="profile__btn_edit" type="submit">Редактировать</button>
              <button type="button" className="profile__btn_exit" onClick={logout}>Выйти из аккаунта</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
