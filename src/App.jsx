import React, { useState, useEffect } from 'react';
import './App.css';
import AppRoutes from './components/AppRoutes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false); // Добавляем состояние для PopExit

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem('isAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.setItem('isAuth', 'false');
    setShowExitPopup(false); //Закрываем попап после выхода
  };

  const showExitConfirm = () => {
    setShowExitPopup(true); // ✅ Показываем попап подтверждения выхода
  };

  const hideExitConfirm = () => {
    setShowExitPopup(false); // ✅ Скрываем попап подтверждения выхода
  };

  return (
    <>
    <AppRoutes 
      isAuth={isAuth} 
      onLogin={handleLogin} 
      onLogout={handleLogout}
      showExitPopup={showExitPopup}
      onShowExitConfirm={showExitConfirm}
      onHideExitConfirm={hideExitConfirm} 
    />
    </>      
  );  
}

export default App;


