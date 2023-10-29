import React, { useEffect } from 'react';
import './CredentialsForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import AppContext from '../../contexts/AppContext';

export const View = {
  Login: 'Login',
  Register: 'Register',
};
function CredentialsForm({ view, onRegistrate, onLogin }) {
  const appContext = React.useContext(AppContext);

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
          <Link to="/signup" className="credentials__container_text-src"> Регистрация</Link>
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
          <Link to="/signin" className="credentials__container_text-src"> Войти</Link>
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
    if (view === View.Login) onLogin(formValues);
    if (view === View.Register) onRegistrate(formValues);
  };

  useEffect(() => () => appContext.setCredentialsError(undefined), []);

  return (
    <div className="credentials">
      <div className="credentials__header">
        <Link to="/" className="credentials__header_link"><img src={logo} className="credentials__header_logo" alt="Логотип" /></Link>
        <h1 className="credentials__header_title">{title}</h1>
      </div>
      <form className={formClass} id="credentialsForm" onSubmit={handleFormSubmit}>
        {view === View.Register ? (
          <div className="credentials__form_container">
            <label htmlFor="credentialsName" className="credentials__form_container-span">Имя</label>
            <input id="credentialsName" minLength="3" maxLength="10" required name="credentialsName" placeholder="Введите имя" type="text" className="credentials__form_container-input" />
          </div>
        ) : null}
        <div className="credentials__form_container">
          <label htmlFor="credentialsEmail" className="credentials__form_container-span">E-mail</label>
          <input required name="credentialsEmail" id="credentialsEmail" placeholder="Введите E-mail" type="email" className="credentials__form_container-input" />
        </div>
        <div className="credentials__form_container credentials__form_container_error-message">
          <label htmlFor="credentialsPassword" className="credentials__form_container-span">Пароль</label>
          <input minLength="3" maxLength="10" required name="credentialsPassword" id="credentialsPassword" placeholder="Пароль" type="password" className="credentials__form_container-input" />
        </div>
        <p className="credentials__form_container-description">{appContext.credentialsError?.message || appContext.credentialsError?.status}</p>
      </form>
      <div className="credentials__container">
        <button type="submit" className="credentials__container_btn" form="credentialsForm">{buttonText}</button>
        {footerContent}
      </div>
    </div>
  );
}

export default CredentialsForm;
