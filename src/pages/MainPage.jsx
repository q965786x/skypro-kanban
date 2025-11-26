import React from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { Outlet, useLocation } from "react-router-dom";

const MainPage = ({ onLogout, cards, isLoading, error, onReloadTasks }) => {
  const location = useLocation();

  const isModalOpen = location.pathname === '/card/new' || 
                      location.pathname === '/exit' ||
                      location.pathname.startsWith('/card/');

  return (
    <div className={`wrapper ${isModalOpen ? 'modal-open' : ''}`}>
      <Header onLogout={onLogout} />
      <Main 
        cards={cards}
        isLoading={isLoading}
        error={error}
        onReloadTasks={onReloadTasks} 
      />
        
      <Outlet />        
    </div>
  );
};

export default MainPage;