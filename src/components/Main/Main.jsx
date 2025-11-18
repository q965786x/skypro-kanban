import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { statuses } from "../../data";
import {
  SMain,
  SMainBlock,
  SMainContent,
  SLoadingContainer,
  SLoadingText,
} from "./Main.styled";
import { SContainer } from "../Header/Header.styled";

const Main = ({ cards }) => {
  const [isLoading, setIsLoading] = useState(true);  
  
  // Имитация загрузки данных
  useEffect(() => {
    const hasSeenLoading = localStorage.getItem('hasSeenLoading');

    if (!hasSeenLoading) {
      // Первый раз - показываем загрузку и запоминаем
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasSeenLoading', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Не первый раз - сразу показываем контент
      setIsLoading(false);
    }
  }, []);

    
  // Функция для получения карточек по статусу из props cards
  const getCardsByStatus = (status) => {
    const filteredCards = cards.filter((card) => card.status === status);
    return filteredCards;
  };

  // Если данные загружаются, показываем индикатор загрузки
  if (isLoading) {
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <SLoadingContainer>
              <SLoadingText>Данные загружаются...</SLoadingText>
            </SLoadingContainer>
          </SMainBlock>
        </SContainer>
      </SMain>
    );
  }

  // После загрузки показываем карточки
  return (
    <SMain>
      <SContainer>
        <SMainBlock>          
          <SMainContent>
            {statuses.map((status) => (
              <Column
                key={status}
                title={status}
                cards={getCardsByStatus(status)}
              />
            ))}
          </SMainContent>
        </SMainBlock>
      </SContainer>
    </SMain>
  );
};

export default Main;
