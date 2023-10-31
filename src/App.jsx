import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
  toastOptions,
} from './utils/constants';
import mainApi from './utils/MainApi';
import Preloader from './Components/Preloader/Preloader';
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
  const mediaQueryList768 = window.matchMedia('(max-width: 768px)');
  const [siderIsOpen, setSiderIsOpen] = useState(false);
  const [moviesError, setMoviesError] = useState(undefined);

  useEffect(() => {
    mainApi.checkAuth()
      .then((response) => {
        handleLogin(response);
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
