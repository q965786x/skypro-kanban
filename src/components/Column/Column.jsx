import React, { useState, useCallback, useContext } from "react";
import Card from "../Card/Card";
import { SMainColumn, SColumnTitle } from "./Column.styled";
import { SCardsContainer } from "../Card/Card.styled";
import { TasksContext } from "../../context/TaskContext";

const Column = ({ title, cards, onCardDrop }) => {
  const [isOver, setIsOver] = useState(false);
  const { updateTask, updateTaskStatus } = useContext(TasksContext);


  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsOver(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsOver(false);
    
    const cardId = e.dataTransfer.getData("text/plain");
    const oldStatus = e.dataTransfer.getData("text/status");
    
    if (oldStatus !== title && cardId) {
      try {
      // 1. Сначала мгновенно обновляем локальное состояние
        if (updateTaskStatus) {
          updateTaskStatus(cardId, title);
        }

      // 2. Находим карточку
      const card = cards.find(c => (c._id || c.id) === cardId);

      if (card) {
        // 3. Вызываем callback для обновления на сервере
          if (onCardDrop) {
            await onCardDrop(cardId, title);
          } else {
            // Если нет callback, используем updateTask напрямую
            await updateTask(cardId, {
              ...card,
              status: title,
            });
          }
        }
      } catch (error) {
        console.error("Ошибка при перемещении карточки:", error);
      }
    }
  }, [title, cards, updateTask, updateTaskStatus, onCardDrop]);

  return (
    <SMainColumn
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isOver ? "rgba(86, 94, 239, 0.05)" : "transparent",
        borderRadius: "10px",
        transition: "background-color 0.3s ease",
        minHeight: "auto",
        padding: "10px",
        border: isOver ? "2px dashed #565eef" : "none",
        
      }}
    >
      <SColumnTitle>
        <p>
          {title} ({cards?.length || 0})
        </p>
      </SColumnTitle>
      <SCardsContainer>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id || card.id}
              id={card._id || card.id}
              topic={card.topic}
              title={card.title}
              date={card.date}
              status={card.status}             
            />
          ))
        ) : (
          <div 
            style={{ 
              padding: "20px", 
              color: "#94A6BE", 
              fontSize: "14px",
              textAlign: "center",
              minHeight: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border: "2px dashed #d4dbe5",
              margin: "5px"
            }}
          >
            Перетащите карточку сюда
          </div>
        )}
      </SCardsContainer>
    </SMainColumn>
  );
};

export default Column;

