import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ isAuth, onLogin, onLogout, showExitPopup, onShowExitConfirm, onHideExitConfirm }) {
  return (
    <Routes>
      {/* Защищенные маршруты */}
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={
          <MainPage 
            onLogout={onLogout}
            showExitPopup={showExitPopup}
            onShowExitConfirm={onShowExitConfirm}
            onHideExitConfirm={onHideExitConfirm} 
          />} 
        />
        <Route path="/card/new" element={<NewCardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/exit" element={<ExitPage />} />
      </Route>
      {/* Публичные маршруты */}
      <Route path="/sign-in" element={<SignInPage onLogin={onLogin} />} />
      <Route path="/sign-up" element={<SignUpPage onLogin={onLogin} />} />

      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
