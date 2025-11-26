import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { fetchTasks, postTask, editTask, deleteTask } from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [cards, setCards] = useState([]); // Состояние для хранения карточек
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Получаем токен из localStorage
  const getToken = useCallback(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo).token : null;
  }, []);

  // Мемоизированная функция загрузки задач
  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const token = getToken();

      if (!token) {
        throw new Error("Токен не найден. Пожалуйста, войдите снова.");
      }

      const data = await fetchTasks({ token });
      setCards(data.tasks || []);
    } catch (err) {
      console.error("Ошибка загрузки задач:", err.message);
      setError(err.message);

      // Если ошибка авторизации, разлогиниваем пользователя
      if (err.message.includes('401') || err.message.includes('токен') || err.message.includes('Неверный')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const authStatus = !!userInfo;
    setIsAuth(authStatus);

    if (authStatus) {
      loadTasks();
    } else {
      setIsLoading(false);
    }
  }, [loadTasks]);


  const handleLogin = useCallback((userData) => {
    setIsAuth(true);
    // Не загружаем задачи сразу, чтобы избежать race condition
    setTimeout(() => loadTasks(), 100);
  }, [loadTasks]);


  const handleLogout = useCallback(() => {
    setIsAuth(false);
    setCards([]);
    setError('');
    localStorage.removeItem("userInfo"); 
    console.log("Пользователь разлогинен");   
  }, []);


  // Функция для создания новой карточки через API
  const createNewCard = useCallback(async (newCardData) => {
    try {
      setError('');
      const token = getToken();
      if (!token) {
        throw new Error("Токен не найден");
      }

      const taskData = {
        title: newCardData.title || "Новая задача",
        topic: newCardData.topic || "Research",
        status: "Без статуса",
        description: newCardData.description || "",
        date: new Date().toISOString(),
      }; 

    const updatedTasks = await postTask({ token, task: taskData });    
      setCards(updatedTasks || []);
      return true;
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError(err.message);
      return false;
    }
  }, [getToken]);

  // Функция для обновления задачи
  const updateCard = useCallback(async (id, updatedData)  => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Токен не найден");
      }

      const updatedTasks = await editTask({ token, id, task: updatedData });
      setCards(updatedTasks || []);
      return true;
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
      setError(err.message);
      return false;
    }
  }, [getToken]);

  // Функция для удаления задачи
  const deleteCard = useCallback(async (id) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Токен не найден");
      }

      const updatedTasks = await deleteTask({ token, id });
      setCards(updatedTasks || []);
      return true;
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
      setError(err.message);
      return false;
    }
  }, [getToken]);

  return (
    <>
      <AppRoutes
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCreateNewCard={createNewCard}
        onUpdateCard={updateCard}
        onDeleteCard={deleteCard}
        cards={cards}
        isLoading={isLoading}
        error={error}
        onReloadTasks={loadTasks}
      />
    </>
  );
}

export default App;
