import React, { useState, useCallback, useContext } from "react";
import Card from "../Card/Card";
import { SMainColumn, SColumnTitle } from "./Column.styled";
import { SCardsContainer } from "../Card/Card.styled";
import { TasksContext } from "../../context/TaskContext";

const Column = ({ title, cards, onCardDrop }) => {
  const [isOver, setIsOver] = useState(false);
  const { updateTaskStatus } = useContext(TasksContext);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setIsOver(false);

      const cardId = e.dataTransfer.getData("text/plain");
      const oldStatus = e.dataTransfer.getData("text/status");

      if (oldStatus !== title && cardId) {
        try {
          if (updateTaskStatus) {
            updateTaskStatus(cardId, title);
          }

          if (onCardDrop) {
            await onCardDrop(cardId, title);
          }
        } catch (error) {
          console.error("Ошибка при перемещении карточки:", error);
        }
      }
    },
    [title, updateTaskStatus, onCardDrop]
  );

  return (
    <SMainColumn
      className="main-column"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isOver ? "rgba(86, 94, 239, 0.05)" : "transparent",
        borderRadius: "10px",
        transition: "background-color 0.3s ease",
        padding: "10px",
        border: isOver ? "2px dashed #565eef" : "none",
      }}
    >
      <SColumnTitle className="column-title">
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
              borderRadius: "10px",
              border: "2px dashed #d4dbe5",
              margin: "5px",
              minWidth: "220px",
              height: "130px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
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
