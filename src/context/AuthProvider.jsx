import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Добавляем состояние проверки
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const storedUser = localStorage.getItem("userInfo");

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (userData && userData.token) {
              // Оставляем автовход
              console.log(
                "Автоматический вход для пользователя:",
                userData.login
              );
              setUser(userData);
              return;
            }
          } catch (e) {
            console.error("Ошибка парсинга userInfo:", e);
            localStorage.removeItem("userInfo");
          }
        }

        // Если нет сохраненного пользователя
        console.log("Нет сохраненного пользователя");
        setUser(null);
        

      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
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
