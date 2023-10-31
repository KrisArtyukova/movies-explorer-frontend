import React, { useEffect } from 'react';
import './Profile.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useProfile from './hook';
import AppContext from '../../contexts/AppContext';
import useValidation, { Field } from '../../utils/useValidation';
import { PROFILE_EMAIL, PROFILE_NAME } from '../../utils/constants';

function EditButtonBlock({ disabled }) {
  return (
    <div className="profile__btn_container_edit">
      <button type="submit" className="profile__container_btn" disabled={disabled}>Сохранить</button>
      {/*
      <button
      type="button"
       className="profile__container_btn profile__container_btn-close"
        onClick={() => setEdit(false)}>✖</button>
       */}
    </div>
  );
}

function Profile({ logout }) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const appContext = React.useContext(AppContext);
  const {
    handleFormSubmit, setEdit, edit, disabled, setDisabled,
  } = useProfile();
  const { nameIsValid, emailIsValid, validate } = useValidation({
    defaultNameIsValid: true, defaultEmailIsValid: true,
  });

  function inputsIsSameAsSaved() {
    const profileNameValue = document.getElementById(PROFILE_NAME).value;
    const profileEmailValue = document.getElementById(PROFILE_EMAIL).value;
    if (
      profileNameValue === currentUserContext?.currentUser?.name
        && profileEmailValue === currentUserContext?.currentUser.email) {
      setDisabled(true);
    } else if (nameIsValid && emailIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  useEffect(() => {
    if (nameIsValid && emailIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailIsValid, nameIsValid]);

  useEffect(() => {
    document.getElementById(PROFILE_NAME).value = currentUserContext?.currentUser?.name;
    document.getElementById(PROFILE_EMAIL).value = currentUserContext?.currentUser.email;
    inputsIsSameAsSaved();
  }, [currentUserContext?.currentUser]);

  const handleInputChange = (event, fieldName) => {
    validate(event, fieldName);
    inputsIsSameAsSaved();
  };

  return (
    <>
      <Header headerView={HeaderView.Authorized} colorMode={ColorMode.Light} />
      <main className="profile">
        <h1 className="profile__title">{`Привет, ${currentUserContext?.currentUser?.name}`}</h1>
        <section className="profile__section">
          <form className="profile__form" onSubmit={handleFormSubmit}>
            <div className="profile__form_container">
              <label htmlFor={PROFILE_NAME} className="profile__form_container-span">Имя</label>
              <input minLength="3" maxLength="10" required id={PROFILE_NAME} placeholder="Имя" type="text" className="profile__form_container-input" onChange={(event) => { handleInputChange(event, Field.Name); }} />
            </div>
            <div className="profile__form_container profile__form_container_bottom">
              <label htmlFor={PROFILE_EMAIL} className="profile__form_container-span">E-mail</label>
              <input required id={PROFILE_EMAIL} placeholder="E-mail" type="email" className="profile__form_container-input" onChange={(event) => { handleInputChange(event, Field.Email); }} />
            </div>
            <div className="profile__btn">
              <p className="profile__form_container-description">{appContext.profileError?.message || appContext.profileError?.status}</p>
              {edit ? <EditButtonBlock disabled={disabled} /> : (
                <>
                  <button className="profile__btn_edit" type="button" onClick={() => setEdit(true)}>Редактировать</button>
                  <button type="button" className="profile__btn_exit" onClick={logout}>Выйти из аккаунта</button>
                </>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
