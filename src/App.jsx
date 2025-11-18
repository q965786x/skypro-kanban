import React, { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { cardsData } from "./data";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [cards, setCards] = useState([]); // Состояние для хранения карточек

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const authStatus = localStorage.getItem("isAuth") === "true";
    setIsAuth(authStatus);

    const savedCards = localStorage.getItem("cards");
         
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(JSON.parse(savedCards));
    } else {
      // Если в localStorage нет карточек, используем начальные данные из data.js
      setCards(cardsData); // Импортируйте cardsData из data.js если нужно
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.setItem("isAuth", "false");
  };

  // Функция для создания новой карточки
  const createNewCard = (newCardData) => {
    const newCard = {
      id: Date.now(), // Генерируем уникальный ID
      topic: newCardData.topic,
      title: newCardData.title,
      date: newCardData.date,
      status: "Без статуса", // Новая карточка всегда без статуса
      description: newCardData.description, // Добавляем описание
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <>
      <AppRoutes
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCreateNewCard={createNewCard}
        cards={cards}
      />
    </>
  );
}

export default App;
