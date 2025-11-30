import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
//import { checkLs } from "../utils/checkLs";
//import { fetchTasks } from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Добавляем состояние проверки
  const isCheckingRef = useRef(false); // Защита от двойной проверки

  useEffect(() => {
    const checkAuth = async () => {
      // Защита от двойных вызовов в StrictMode
      if (isCheckingRef.current) {
        return;
      }

      isCheckingRef.current = true;

      try {
        setIsCheckingAuth(true);

        // Добавляем небольшую задержку для лучшего UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const storedUser = localStorage.getItem("userInfo");

        console.log(
          "Автоматический вход отключен - показываем форму авторизации"
        );
        setUser(null);
        localStorage.removeItem("userInfo"); // Очищаем на всякий случай
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        localStorage.removeItem("userInfo");
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
        isCheckingRef.current = false;
      }
    };

    checkAuth();
  }, []);

  const updateUserInfo = (userData) => {
    console.log("AuthProvider: обновление пользователя", userData?.login);
    setUser(userData);
    if (userData) {
      localStorage.setItem("userInfo", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userInfo");
      console.log("Пользователь удален из localStorage");
    }
  };

  const login = (loginData) => {
    console.log("AuthProvider: вход пользователя", loginData.login);
    updateUserInfo(loginData);
    return true;
  };

  const logout = () => {
    console.log("AuthProvider: выход пользователя");
    updateUserInfo(null);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserInfo,
        isCheckingAuth, // Добавляем в контекст
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
