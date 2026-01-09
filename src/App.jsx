import React, { useContext, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./context/Theme";
import AppRoutes from "./components/AppRoutes";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";
import { AuthContext } from "./context/AuthContext";
import MobileCreateButton from "./components/MobileCreateButton";
import { ModalProvider } from "./context/Modal";
import { DragDropProvider } from "./context/DragDropContext";

// Упрощенный компонент загрузки
const LoadingSpinner = () => (
  <div style={styles.loadingContainer}>
    <div style={styles.spinner}></div>
    <div>Загрузка приложения...</div>
  </div>
);

// Стили
const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#eaeef6",
    fontSize: "18px",
    color: "#565eef",
    flexDirection: "column",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #565eef",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
};

// Компонент с проверкой авторизации
function AppContent() {
  const { isCheckingAuth } = useContext(AuthContext);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <TaskProvider>
      <AppRoutes />
      <MobileCreateButton />
    </TaskProvider>
  );
}

// Главный компонент
function App() {
  return (
    <ModalProvider>
      <ThemeProvider>
        <AuthProvider>
          <DragDropProvider>
            <AppContent />
          </DragDropProvider>
        </AuthProvider>
      </ThemeProvider>
    </ModalProvider>
  );
}

export default App;
