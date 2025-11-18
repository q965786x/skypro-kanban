import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

const NewCardPage = ({ onCreateCard, cards, onLogout }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Возврат на главную
  };

  const handleCreate = (newCardData) => {
    onCreateCard(newCardData);
    navigate('/'); // Возврат на главную после создания
  };

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header onLogout={onLogout} />
      <Main cards={cards} />
      
      {/* Поверх всего показываем модальное окно */}
      <PopNewCard 
        isOpen={true}
        onClose={handleClose}
        onCreateCard={handleCreate}
      />
    </div>
  );
};

export default NewCardPage;
