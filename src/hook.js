import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import mainApi from './utils/MainApi';
import { SAVED_MOVIES_STATE, SavedSearch, USER_TOKEN } from './utils/constants';

function useApp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentialsError, setCredentialsError] = useState(undefined);
  const [profileError, setProfileError] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(response) {
    setCurrentUser(response.user);
    setLoggedIn(true);
    navigate('/movies');
  }

  function onLoginUser({ password, email }) {
    mainApi.login({ password, email })
      .then((response) => {
        localStorage.setItem(USER_TOKEN, response.token);
        handleLogin(response);
      })
      .catch((error) => {
        toast.error(`Произошла ошибка при входе! ${error}`, { icon: '❌' });
        setCredentialsError(error);
      });
  }

  function onRegistrateUser({ name, password, email }) {
    setLoading(true);
    mainApi.registrate({ name, password, email })
      .then(() => {
        onLoginUser({ password, email });
      })
      .catch((error) => {
        setLoading(false);
        setCredentialsError(error);
        toast.error(`Произошла ошибка при регистрации! ${error}`, { icon: '❌' });
      });
  }

  function logout() {
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(SAVED_MOVIES_STATE);
    localStorage.removeItem(SavedSearch);
    setLoggedIn(false);
    navigate('/');
  }

  return {
    handleLogin,
    onLoginUser,
    onRegistrateUser,
    logout,
    currentUser,
    setCurrentUser,
    loggedIn,
    credentialsError,
    setCredentialsError,
    loading,
    setLoading,
    profileError,
    setProfileError,
  };
}

export default useApp;
