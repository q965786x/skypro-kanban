import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, isCheckingAuth } = useContext(AuthContext);

  // Пока проверяем авторизацию, показываем заглушку
  if (isCheckingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#eaeef6",
        }}
      >
        <div>Проверка авторизации...</div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
