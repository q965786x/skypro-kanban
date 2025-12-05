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
  console.log(`Фильтрация для статуса "${status}":`);
  
  const filtered = tasks.filter((task) => {
    console.log(`  Задача "${task.title}": статус="${task.status}"`);
    return task.status === status;
  });
  
  console.log(`  Найдено: ${filtered.length} задач`);
  return filtered;
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


{/* import React, { useContext } from "react";
import { TasksContext } from "../../context/TaskContext";
import {
  SMain,
  SMainBlock,
  SMainContent,
} from "./Main.styled";
import { SContainer } from "../Header/Header.styled";

const Main = () => {
  const { tasks, isLoading, error } = useContext(TasksContext);

  console.log("=== Main.jsx ===");
  console.log("Всего задач:", tasks?.length);
  
  // Проверим распределение по статусам
  const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];
  
  statuses.forEach(status => {
    const count = tasks?.filter(task => task.status === status).length || 0;
    console.log(`${status}: ${count} задач`);
  });

  if (isLoading) {
    console.log("Main: показываем состояние загрузки");
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <div style={{ textAlign: "center", padding: "50px" }}>
              Данные загружаются...
            </div>
          </SMainBlock>
        </SContainer>
      </SMain>
    );
  }

  if (error) {
    console.log("Main: показываем ошибку:", error);
    return (
      <SMain>
        <SContainer>
          <SMainBlock>
            <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
              Ошибка: {error}
            </div>
          </SMainBlock>
        </SContainer>
      </SMain>
    );
  }

  // ПРОСТОЙ ТЕСТ: покажем задачи в любом формате
  console.log("Main: начинаем рендер контента");
  
  
  
  return (
    <SMain>
      <SContainer>
        <SMainBlock>
          {/* ОСНОВНОЙ КОНТЕНТ */}
          {/* <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#565eef", marginBottom: "20px" }}>Колонки задач:</h3>
            
            {!tasks || !Array.isArray(tasks) ? (
              <div style={{ 
                textAlign: "center", 
                padding: "40px", 
                background: "#fff",
                borderRadius: "10px",
                border: "2px dashed #ccc"
              }}>
                <p style={{ color: "#ff6b6b", fontSize: "18px" }}>⚠️ Задачи не загружены или не в массиве</p>
                <p>tasks = {JSON.stringify(tasks)}</p>
              </div>
            ) : tasks.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "40px", 
                background: "#fff",
                borderRadius: "10px",
                border: "2px dashed #ccc"
              }}>
                <p style={{ color: "#94a6be", fontSize: "18px" }}>📭 Нет задач</p>
                <p>Создайте первую задачу!</p>
              </div>
            ) : (
              <SMainContent>
                {statuses.map((status) => {
                  const cards = tasks.filter(task => task.status === status);
                  console.log(`Колонка "${status}": ${cards.length} задач`);
                  
                  return (
                    <div key={status} style={{
                      flex: 1,
                      minWidth: "200px",
                      background: "#fff",
                      borderRadius: "10px",
                      padding: "15px",
                      marginRight: "15px",
                      border: "1px solid #eaeef6"
                    }}>
                      <h4 style={{ 
                        color: "#94a6be", 
                        margin: "0 0 15px 0",
                        fontSize: "14px",
                        textTransform: "uppercase"
                      }}>
                        {status} ({cards.length})
                      </h4>
                      
                      {cards.length > 0 ? (
                        cards.map(card => (
                          <div key={card._id || card.id} style={{
                            background: "#f8f9fa",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            borderLeft: `4px solid ${
                              card.topic === "Web Design" ? "#FF6D00" :
                              card.topic === "Research" ? "#06B16E" :
                              card.topic === "Copywriting" ? "#9A48F1" : "#94A6BE"
                            }`
                          }}>
                            <div style={{ 
                              fontSize: "12px", 
                              color: "#fff", 
                              background: card.topic === "Web Design" ? "#FF6D00" :
                                        card.topic === "Research" ? "#06B16E" :
                                        card.topic === "Copywriting" ? "#9A48F1" : "#94A6BE",
                              padding: "2px 8px",
                              borderRadius: "10px",
                              display: "inline-block",
                              marginBottom: "5px"
                            }}>
                              {card.topic}
                            </div>
                            <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                              {card.title}
                            </div>
                            <div style={{ fontSize: "11px", color: "#94a6be" }}>
                              {new Date(card.date).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ 
                          textAlign: "center", 
                          padding: "20px",
                          color: "#ccc",
                          fontSize: "14px"
                        }}>
                          Пусто
                        </div>
                      )}
                    </div>
                  );
                })}
              </SMainContent>
            )}
          </div>
        </SMainBlock>
      </SContainer>
    </SMain>
  );
};

export default Main; */}
