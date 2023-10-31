import React, { useEffect, useState } from 'react';
import './CredentialsForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import AppContext from '../../contexts/AppContext';
import useValidation, { Field } from '../../utils/useValidation';
import { MAIN_PAGE, SIGN_IN, SIGN_UP } from '../../utils/constants';

export const View = {
  Login: 'Login',
  Register: 'Register',
};

function CredentialsForm({ view, onRegistrate, onLogin }) {
  const appContext = React.useContext(AppContext);
  const {
    validate, nameIsValid, passwordIsValid, emailIsValid,
  } = useValidation({
    defaultNameIsValid: view === View.Login, defaultEmailIsValid: view === View.Login,
  });
  const [disabled, setDisabled] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDisabled(view !== View.Login);
  //   }, 0);
  // }, []);

  useEffect(() => {
    if (view === View.Login) {
      if (passwordIsValid && emailIsValid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    if (view === View.Register) {
      if (nameIsValid && emailIsValid && passwordIsValid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [passwordIsValid, emailIsValid, nameIsValid]);

  let title = '';
  let buttonText = '';
  let footerContent = null;
  let formClass = '';

  switch (view) {
    case View.Login:
      title = 'Рады видеть!';
      buttonText = 'Войти';
      formClass = 'credentials__form credentials__form_login';
      footerContent = (
        <p className="credentials__container_text">
          Ещё не зарегистрированы?
          <Link to={SIGN_UP} className="credentials__container_text-src"> Регистрация</Link>
        </p>
      );
      break;
    case View.Register:
      title = 'Добро пожаловать!';
      buttonText = 'Зарегестрироваться';
      formClass = 'credentials__form credentials__form_register';
      footerContent = (
        <p className="credentials__container_text">
          Уже зарегистрированы?
          <Link to={SIGN_IN} className="credentials__container_text-src"> Войти</Link>
        </p>
      );
      break;
    default:
      break;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      name: event.target?.credentialsName?.value,
      email: event.target?.credentialsEmail?.value,
      password: event.target?.credentialsPassword?.value,
    };
    if (view === View.Login) onLogin(formValues, setDisabled);
    if (view === View.Register) onRegistrate(formValues, setDisabled);
  };

  useEffect(() => () => appContext.setCredentialsError(undefined), []);

  return (
    <div className="credentials">
      <div className="credentials__header">
        <Link to={MAIN_PAGE} className="credentials__header_link"><img src={logo} className="credentials__header_logo" alt="Логотип" /></Link>
        <h1 className="credentials__header_title">{title}</h1>
      </div>
      <form className={formClass} id="credentialsForm" onSubmit={handleFormSubmit}>
        {view === View.Register ? (
          <div className="credentials__form_container">
            <label htmlFor="credentialsName" className="credentials__form_container-span">Имя</label>
            <input id="credentialsName" minLength="3" maxLength="10" required name="credentialsName" placeholder="Введите имя" type="text" className="credentials__form_container-input" onChange={(event) => { validate(event, Field.Name); }} />
          </div>
        ) : null}
        <div className="credentials__form_container">
          <label htmlFor="credentialsEmail" className="credentials__form_container-span">E-mail</label>
          <input required name="credentialsEmail" id="credentialsEmail" placeholder="Введите E-mail" type="email" className="credentials__form_container-input" onChange={(event) => { validate(event, Field.Email); }} />
        </div>
        <div className="credentials__form_container credentials__form_container_error-message">
          <label htmlFor="credentialsPassword" className="credentials__form_container-span">Пароль</label>
          <input minLength="3" maxLength="10" required name="credentialsPassword" id="credentialsPassword" placeholder="Пароль" type="password" className="credentials__form_container-input" onChange={(event) => { validate(event, Field.Password); }} />
        </div>
        <p className="credentials__form_container-description">{appContext.credentialsError?.message || appContext.credentialsError?.status}</p>
      </form>
      <div className="credentials__container">
        <button type="submit" className="credentials__container_btn" form="credentialsForm" disabled={disabled}>{buttonText}</button>
        {footerContent}
      </div>
    </div>
  );
}

export default CredentialsForm;
