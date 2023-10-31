import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainPage from '../../pages/MainPage/MainPage';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register/Register';
import Error from '../../pages/Error/Error';
import Login from '../../pages/Login/Login';
import Sider from '../Sider/Sider';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesContext from '../../contexts/MoviesContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  MAIN_PAGE, MAX_WIDTH_768,
  MOVIES, NOT_FOUND, PROFILE, SAVED_MOVIES,
  SIGN_IN, SIGN_UP,
  toastOptions,
} from '../../utils/constants';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import useApp from './hook';

function App() {
  const {
    handleLogin,
    logout,
    onLoginUser,
    onRegistrateUser,
    currentUser,
    setCurrentUser,
    loggedIn,
    credentialsError,
    setCredentialsError,
    setLoading,
    loading,
    profileError,
    setProfileError,
  } = useApp();
  const mediaQueryList768 = window.matchMedia(MAX_WIDTH_768);
  const [siderIsOpen, setSiderIsOpen] = useState(false);
  const [moviesError, setMoviesError] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    mainApi.checkAuth()
      .then((response) => {
        handleLogin(response, location);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

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
      profileError,
      setProfileError,
    }}
    >
      <MoviesContext.Provider value={{ movies, setMovies }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Toaster toastOptions={toastOptions} />
          {loading ? <Preloader /> : null }
          <div className="App">
            <Routes>
              <Route path={MAIN_PAGE} element={<MainPage />} />
              <Route
                path={MOVIES}
                element={(
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies />
                  </ProtectedRoute>
)}
              />
              <Route
                path={SAVED_MOVIES}
                element={(
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies />
                  </ProtectedRoute>
)}
              />
              <Route
                path={PROFILE}
                element={(
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile logout={logout} />
                  </ProtectedRoute>
)}
              />
              <Route path={SIGN_IN} element={<Login onLogin={onLoginUser} />} />
              <Route path={SIGN_UP} element={<Register onRegistrate={onRegistrateUser} />} />
              <Route path={NOT_FOUND} element={<Error />} />
            </Routes>
            {mediaQueryList768.matches ? <Sider /> : null}
          </div>
        </CurrentUserContext.Provider>
      </MoviesContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
