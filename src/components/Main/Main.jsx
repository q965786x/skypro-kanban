import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { getCardsByStatus, statuses } from "../../../data";
import {
  SMain,
  SMainBlock,
  SMainContent,
  SLoadingContainer,
  SLoadingText,
} from "./Main.styled";
import { SContainer } from "../Header/Header.styled";

const Main = () => {
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
