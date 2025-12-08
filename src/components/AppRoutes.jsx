import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import NotFound from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Защищенные маршруты */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/card/new" element={<NewCardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/exit" element={<ExitPage />} />
      </Route>

      {/* Публичные маршруты */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
