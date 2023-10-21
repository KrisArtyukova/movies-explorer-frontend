import React from 'react';
import './MainPage.css';
import Header, { ColorMode, HeaderView } from '../../Components/Header/Header';
import Promo from '../../Components/Promo/Promo';
import Footer from '../../Components/Footer/Footer';
import NavTab from '../../Components/NavTab/NavTab';
import AboutProject from '../../Components/AboutProject/AboutProject';
import AboutMe from '../../Components/AboutMe/AboutMe';
import Portfolio from '../../Components/Portfolio/Portfolio';

function MainPage() {
  return (
    <div className="main-page">
      <Header headerView={HeaderView.NotAuthorized} colorMode={ColorMode.Dark} />
      <Promo />
      <div className="page-container">
        <NavTab />
      </div>
      <AboutProject />
      <div className="page-container">
        <AboutMe />
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
