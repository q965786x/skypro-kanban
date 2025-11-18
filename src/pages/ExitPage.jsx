import React from "react";
import { useNavigate } from "react-router-dom";
import PopExit from "../components/PopExit/PopExit";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

const ExitPage = ({ onLogout, cards }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Возврат на главную
  };

  const handleLogout = () => {
    onLogout();
    navigate('/sign-in'); // Перенаправление на страницу входа
  };

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header onLogout={onLogout} />
      <Main cards={cards} />
      
      {/* Поверх всего показываем модальное окно */}
      <PopExit 
        onLogout={handleLogout}
        onHideExitConfirm={handleClose}
        showExitPopup={true}
      />
    </div>
  );
};

export default ExitPage;
