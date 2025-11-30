import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopExit from "../components/PopExit/PopExit";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { AuthContext } from "../context/AuthContext";

const ExitPage = () => {
  const { logout } = useContext(AuthContext); // Используем logout из контекста
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Возврат на главную
  };

  const handleLogout = () => {
    logout(); // Используем функцию из контекста вместо пропса
    navigate("/sign-in"); // Перенаправление на страницу входа
  };

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header />
      <Main />

      {/* Поверх всего показываем модальное окно */}
      <PopExit onConfirm={handleLogout} onCancel={handleClose} isOpen={true} />
    </div>
  );
};

export default ExitPage;
