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


function AppRoutes({ 
  isAuth, 
  onLogin, 
  onLogout, 
  onCreateNewCard,
  cards 
}) {
  
  return (
    <Routes>
      {/* Защищенные маршруты */}
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={
          <MainPage 
            onLogout={onLogout}            
            cards={cards} // cards передаются в MainPage            
          />} 
        />
        {/* Вложенные маршруты для модальных окон */}
        <Route path="/card/new" element={
          <NewCardPage
            onCreateCard={onCreateNewCard}
            onLogout={onLogout}
            cards={cards} // cards передаются в NewCardPage
            
          />} 
        />

        <Route path="/card/:id" element={
          <CardPage
            onLogout={onLogout}
            cards={cards} // cards передаются в CardPage            
          />} 
        />
        
        <Route path="/exit" element={
          <ExitPage
            onLogout={onLogout}
            cards={cards} // cards передаются в ExitPage
          />} 
        />
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
