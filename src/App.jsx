import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage/MainPage';
import Movies from './pages/Movies/Movies';
import SavedMovies from './pages/SavedMovies/SavedMovies';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Sider from './Components/Sider/Sider';
import AppContext from './contexts/AppContext';
import CurrentUserContext from './contexts/CurrentUserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import {
  SavedMoviesState, SavedSearch, toastOptions, USER_TOKEN,
} from './utils/constants';
import mainApi from './utils/MainApi';
import Preloader from './Components/Preloader/Preloader';

function App() {
  const mediaQueryList768 = window.matchMedia('(max-width: 768px)');
  const [siderIsOpen, setSiderIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [credentialsError, setCredentialsError] = useState(undefined);
  const [moviesError, setMoviesError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogin(response) {
    setCurrentUser(response.user);
    setLoggedIn(true);
    navigate('/movies');
  }

  useEffect(() => {
    mainApi.checkAuth()
      .then((response) => {
        handleLogin(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        setLoading(false);
        toast.success('Вы успешно зарегистрированы и будете перенаправлены на страницу входа!', { icon: '✅' });
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setCredentialsError(error);
        toast.error(`Произошла ошибка при регистрации! ${error}`, { icon: '❌' });
      });
  }

  function logout() {
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(SavedMoviesState);
    localStorage.removeItem(SavedSearch);
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <AppContext.Provider value={{
      loggedIn,
      siderIsOpen,
      setSiderIsOpen,
      loading,
      setLoading,
      credentialsError,
      setCredentialsError,
      moviesError,
      setMoviesError,
    }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Toaster toastOptions={toastOptions} />
        {loading ? <Preloader /> : null }
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<ProtectedRoute loggedIn={loggedIn}><Movies /></ProtectedRoute>} />
            <Route path="/saved-movies" element={<ProtectedRoute loggedIn={loggedIn}><SavedMovies /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute loggedIn={loggedIn}><Profile logout={logout} /></ProtectedRoute>} />
            <Route path="/signin" element={<Login onLogin={onLoginUser} />} />
            <Route path="/signup" element={<Register onRegistrate={onRegistrateUser} />} />
            <Route path="*" element={<Error />} />
          </Routes>
          {mediaQueryList768.matches ? <Sider /> : null}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
