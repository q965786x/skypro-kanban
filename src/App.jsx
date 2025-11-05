import React from 'react';
import './App.css';
import AppRoutes from './components/AppRoutes';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import PopExit from './components/PopExit/PopExit';
import PopNewCard from './components/PopNewCard/PopNewCard';
import PopBrowse from './components/PopBrowse/PopBrowse';


const App = () => {  

  return (

    <div className="wrapper">
      {/* Pop-up компоненты */}
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      
      {/* Основные компоненты */}
      <Header />
      <Main />      
    </div>
  );
};

export default App;


