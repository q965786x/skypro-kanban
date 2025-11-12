import React from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopExit from "../components/PopExit/PopExit";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";

const MainPage = ({ onLogout, showExitPopup, onShowExitConfirm, onHideExitConfirm }) => {
  return (
    <div className="wrapper">
      {/* Pop-up компоненты */}
      <PopExit 
        onLogout={onLogout}
        onHideExitConfirm={onHideExitConfirm}
        showExitPopup={showExitPopup}
      />
      <PopNewCard />
      <PopBrowse />

      {/* Основные компоненты */}
      <Header 
        onLogout={onLogout}
        onShowExitConfirm={onShowExitConfirm}
      />
      <Main 
        onLogout={onLogout} 
        showExitPopup={showExitPopup}
        onShowExitConfirm={onShowExitConfirm}
        onHideExitConfirm={onHideExitConfirm}
      />
    </div>
  );
};

export default MainPage;
