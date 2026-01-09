import React, { useContext, useCallback, useState, useEffect } from "react";
import Column from "../Column/Column";
import { statuses } from "../../data";
import { TasksContext } from "../../context/TaskContext";
import DragDropNotification from "../DragDropNotification";
import MobileCreateButton from "../MobileCreateButton";
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
import { useMobileDragDrop } from "../../hooks/useMobileDragDrop";

const Main = () => {
  const { tasks, isLoading, error, refetchTasks, isOfflineMode, updateTask } =
    useContext(TasksContext);
  const [notification, setNotification] = useState("");
  const [mobileDraggedCard, setMobileDraggedCard] = useState(null);

  // Хук для мобильного Drag&Drop
  const {
    isDragging: isMobileDragging,
    dragPosition,
    draggedCard: mobileDraggedCardData,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useMobileDragDrop(
    async (cardId, newStatus) => {
      await handleCardDrop(cardId, newStatus);
    },
    ""
  );

  
  // Функция для обновления статуса карточки при перетаскивании
  const handleCardDrop = useCallback(
    async (cardId, newStatus) => {
      const card = tasks.find((c) => (c._id || c.id) === cardId);
      if (card && card.status !== newStatus) {
        try {
          await updateTask(cardId, {
            ...card,
            status: newStatus,
          });

          // Показываем уведомление об успешном перемещении
          setNotification(`Задача перемещена в "${newStatus}"`);

          // Автоматически скрываем через 3 секунды
          setTimeout(() => setNotification(""), 3000);
        } catch (error) {
          console.error("Ошибка при перемещении карточки:", error);
          setNotification("Ошибка при перемещении задачи");
          setTimeout(() => setNotification(""), 3000);
        }
      }
    },
    [tasks, updateTask]
  );

  // Эффект для отслеживания мобильного перетаскивания
  useEffect(() => {
    if (isMobileDragging) {
      // Добавляем стили для всего документа при перетаскивании
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
      
      // Показываем индикатор перетаскивания
      setMobileDraggedCard(mobileDraggedCardData);
    } else {
      // Восстанавливаем стили
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
      setMobileDraggedCard(null);
    }
  }, [isMobileDragging, mobileDraggedCardData]);

  // Рендерим перетаскиваемую карточку поверх всего
  const renderDraggedCard = () => {
    if (!isMobileDragging || !mobileDraggedCardData || !dragPosition) {
      return null;
    }

   return (
      <div
        style={{
          position: 'fixed',
          left: dragPosition.x,
          top: dragPosition.y,
          width: '300px',
          zIndex: 10000,
          pointerEvents: 'none',
          opacity: 0.9,
          transform: 'scale(1.05)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          background: 'white',
          padding: '15px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ 
            padding: '4px 8px', 
            borderRadius: '4px', 
            background: mobileDraggedCardData.topic === 'Web Design' ? '#FFE4C2' : 
                       mobileDraggedCardData.topic === 'Research' ? '#B4FDD1' : 
                       mobileDraggedCardData.topic === 'Copywriting' ? '#E9D4FF' : '#FFE4C2',
            fontSize: '10px',
            color: mobileDraggedCardData.topic === 'Web Design' ? '#FF6D00' : 
                   mobileDraggedCardData.topic === 'Research' ? '#06B16E' : 
                   mobileDraggedCardData.topic === 'Copywriting' ? '#9A48F1' : '#FF6D00'
          }}>
            {mobileDraggedCardData.topic}
          </span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          {mobileDraggedCardData.title}
        </div>
        <div style={{ fontSize: '12px', color: '#94A6BE', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📅 {new Date(mobileDraggedCardData.date).toLocaleDateString("ru-RU")}
        </div>
      </div>
    );
  };

  // Добавляем инструкцию для пользователей
  const renderMobileInstructions = () => {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e9ecef',
        fontSize: '12px',
        color: '#6c757d',
        textAlign: 'center',
        display: window.innerWidth <= 768 ? 'block' : 'none'
      }}>
        📱 Для перемещения задачи: зажмите и удерживайте карточку, затем перетащите в нужную колонку
      </div>
    );
  };


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
      <>
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
        <DragDropNotification message={notification} />
        <MobileCreateButton />
      </>
    );
  }

  if (error) {
    return (
      <>
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
        <DragDropNotification message={notification} />
      </>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <>
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
        <DragDropNotification message={notification} />
      </>
    );
  }

  return (
    <>
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

            {renderMobileInstructions()}

            <SMainContent>
              {statuses.map((status) => {
                const cards = getCardsByStatus(status);
                return (
                  <Column
                    key={status}
                    title={status}
                    cards={cards}
                    onCardDrop={handleCardDrop}
                  />
                );
              })}
            </SMainContent>
          </SMainBlock>
        </SContainer>
      </SMain>

      {renderDraggedCard()}
      <DragDropNotification message={notification} />
    </>
  );
};
export default Main;
