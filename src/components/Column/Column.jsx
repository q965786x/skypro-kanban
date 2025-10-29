import React from 'react';
import Card from '../Card/Card';

const Column = ({ title, taskCount }) => {
  const generateCards = (count) => {
    const cards = [];
    const themes = ['_orange', '_green', '_purple'];
    const themeNames = ['Web Design', 'Research', 'Copywriting'];
    
    for (let i = 0; i < count; i++) {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomThemeName = themeNames[themes.indexOf(randomTheme)];
      
      cards.push(
        <Card 
          key={i}
          theme={randomTheme}
          themeName={randomThemeName}
          title="Название задачи"
          date="30.10.23"
        />
      );
    }
    return cards;
  };

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {generateCards(taskCount)}
      </div>
    </div>
  );
};

export default Column;