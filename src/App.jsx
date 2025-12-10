import React, { useContext } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";
import { AuthContext } from "./context/AuthContext";

// Компонент-обертка для отображения загрузки
const AppContent = () => {
  const { user, isCheckingAuth } = useContext(AuthContext); // user должен быть первым!

  if (isCheckingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#eaeef6",
          fontSize: "18px",
          color: "#565eef",
        }}
      >
        <div className="loading-spinner" style={{ marginRight: "20px" }}></div>
        Загрузка приложения...
      </div>
    );
  }
  return (
    <TaskProvider>
      <AppRoutes />
    </TaskProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
