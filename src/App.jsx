import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Movies from './pages/Movies/Movies';
import SavedMovies from './pages/SavedMovies/SavedMovies';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Sider from './Components/Sider/Sider';
import AppContext from './contexts/AppContext';

function App() {
  const mediaQueryList768 = window.matchMedia('(max-width: 768px)');
  const [siderIsOpen, setSiderIsOpen] = useState(false);

  return (
    <AppContext.Provider value={{ siderIsOpen, setSiderIsOpen }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {mediaQueryList768.matches ? <Sider /> : null}
      </div>
    </AppContext.Provider>

  );
}

export default App;
