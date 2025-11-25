import React from "react";
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


const Main = ({ cards, isLoading, error, onReloadTasks }) => {

  const handleRetry = () => {
    if (onReloadTasks) {
      onReloadTasks();
    }
  };

  // Функция для получения карточек по статусу из props cards
  const getCardsByStatus = (status) => {
    return cards.filter((card) => card.status === status);
  };

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

  if (error) {
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <SLoadingContainer>
              <SLoadingText style={{ color: "red" }}>Ошибка: {error}</SLoadingText>
              <button 
                onClick={handleRetry} 
                style={{ 
                  marginTop: "20px", 
                  padding: "10px 20px",
                  backgroundColor: "#565EEF",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Попробовать снова
              </button>
            </SLoadingContainer>
          </SMainBlock>
        </SContainer>
      </SMain>
    );
  }

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
 