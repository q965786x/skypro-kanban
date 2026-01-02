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
  SLoadingSpinner,
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

  const getCardsByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  if (isLoading) {
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <SLoadingContainer>
              <SLoadingSpinner />
              <SLoadingText>Загружаем задачи...</SLoadingText>
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

  if (!tasks || tasks.length === 0) {
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <div
              style={{
                textAlign: "center",
                padding: "50px",
                background: "white",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>📭</div>
              <h3 style={{ color: "#565eef", marginBottom: "10px" }}>
                Задач пока нет
              </h3>
              <p style={{ color: "#94a6be" }}>
                Создайте первую задачу, нажав на кнопку "Создать новую задачу"
              </p>
            </div>
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
            {statuses.map((status) => {
              const cards = getCardsByStatus(status);
              return cards.length > 0 ? (
                <Column key={status} title={status} cards={cards} />
              ) : null;
            })}
          </SMainContent>
        </SMainBlock>
      </SContainer>
    </SMain>
  );
};
export default Main;
