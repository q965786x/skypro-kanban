import React, { useContext } from "react";
import Column from "../Column/Column";
import { statuses } from "../../data";
import { TasksContext } from "../../context/TaskContext";
import {
  SMain,
  SMainBlock,
  SMainContent,
  SLoadingContainer,
  SLoadingText,
  SErrorContainer,
  SErrorText,
  SRetryButton,
  SOfflineIndicator,
} from "./Main.styled";
import { SContainer } from "../Header/Header.styled";

const Main = () => {
  const { tasks, isLoading, error, refetchTasks, isOfflineMode } =
    useContext(TasksContext);

  const handleRetry = () => {
    if (refetchTasks) {
      refetchTasks();
    }
  };

  // Функция для получения карточек по статусу из props cards
  const getCardsByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
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
            <SErrorContainer>
              <SErrorText>Ошибка: {error}</SErrorText>
              {isOfflineMode && (
                <SOfflineIndicator>
                  🔄 Используются локальные данные
                </SOfflineIndicator>
              )}
              <SRetryButton onClick={handleRetry}>
                Попробовать снова
              </SRetryButton>
            </SErrorContainer>
          </SMainBlock>
        </SContainer>
      </SMain>
    );
  }

  return (
    <SMain>
      <SContainer>
        <SMainBlock>
          {isOfflineMode && (
            <SOfflineIndicator
              style={{
                background: "#FFF3CD",
                color: "#856404",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
                textAlign: "center",
                border: "1px solid #FFEEBA",
              }}
            >
              ⚡ Режим оффлайн: используются локальные данные
            </SOfflineIndicator>
          )}
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
