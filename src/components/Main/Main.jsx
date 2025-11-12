import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Column from "../Column/Column";
import { getCardsByStatus, statuses } from "../data";
import {
  SMain,
  SMainBlock,
  SMainContent,
  SLoadingContainer,
  SLoadingText,
  HeaderSection,
  WelcomeText,
  AddCardButton,
} from "./Main.styled";
import { SContainer } from "../Header/Header.styled";

const Main = ({ onLogout, showExitPopup, onShowExitConfirm, onHideExitConfirm }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Очистка таймера
    return () => clearTimeout(timer);
  }, []);

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
          {/*<HeaderSection>
              <button 
                onClick={onShowExitConfirm} // Показываем подтверждение выхода
                style={{ 
                  marginLeft: '10px', 
                  padding: '10px 20px', 
                  background: 'transparent', 
                  color: '#565EEF', 
                  border: '1px solid #565EEF',
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#565EEF';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#565EEF';
                }}
              >
                Выйти
              </button>
        </HeaderSection> */}
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
