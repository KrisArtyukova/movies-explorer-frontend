import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import {
  MAIN_PAGE,
  MOVIES, PROFILE,
  SAVED_MOVIES_STATE, SAVED_SEARCH_MOVIE, SAVED_SEARCH_SAVED_MOVIE, SIGN_IN, SIGN_UP, USER_TOKEN,
} from '../../utils/constants';

function useApp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentialsError, setCredentialsError] = useState(undefined);
  const [profileError, setProfileError] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(response, location) {
    if (response) {
      if (location?.pathname === SIGN_IN || location?.pathname === SIGN_UP) {
        setCurrentUser(response.user);
        setLoggedIn(true);
        navigate(PROFILE);
      } else {
        setCurrentUser(response.user);
        setLoggedIn(true);
        navigate(location?.pathname ?? MOVIES);
      }
    }
  }

  function onLoginUser({ password, email }, setDisabled) {
    setDisabled(true);
    setLoading(true);
    mainApi.login({ password, email })
      .then((response) => {
        localStorage.setItem(USER_TOKEN, response.token);
        setDisabled(false);
        setLoading(false);
        handleLogin(response);
      })
      .catch((error) => {
        setDisabled(false);
        setLoading(false);
        toast.error(`Произошла ошибка при входе! ${error}`, { icon: '❌' });
        setCredentialsError(error);
      });
  }

  function onRegistrateUser({ name, password, email }, setDisabled) {
    setLoading(true);
    setDisabled(true);
    mainApi.registrate({ name, password, email })
      .then(() => {
        onLoginUser({ password, email }, setDisabled);
      })
      .catch((error) => {
        setDisabled(false);
        setLoading(false);
        setCredentialsError(error);
        toast.error(`Произошла ошибка при регистрации! ${error}`, { icon: '❌' });
      });
  }

  function logout() {
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(SAVED_MOVIES_STATE);
    localStorage.removeItem(SAVED_SEARCH_MOVIE);
    localStorage.removeItem(SAVED_SEARCH_SAVED_MOVIE);
    setLoggedIn(false);
    navigate(MAIN_PAGE);
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
