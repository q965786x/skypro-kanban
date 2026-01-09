import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const storedUser = localStorage.getItem("userInfo");

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (userData && userData.token) {
              setUser(userData);
              return;
            }
          } catch (e) {
            localStorage.removeItem("userInfo");
          }
        }

        setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const updateUserInfo = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("userInfo", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  const login = (loginData) => {
    updateUserInfo(loginData);
    return true;
  };

  const logout = () => {
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
        isCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
