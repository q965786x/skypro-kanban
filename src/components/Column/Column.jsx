import React from "react";
import Card from "../Card/Card";
import { SMainColumn, SColumnTitle } from "./Column.styled";
import { SCardsContainer } from "../Card/Card.styled";

const Column = ({ title, cards }) => {
  console.log(`Column "${title}":`, {
    полученоКарточек: cards?.length,
    примерКарточки: cards?.[0],
  });

  return (
    <SMainColumn>
      <SColumnTitle>
        <p>
          {title} ({cards?.length || 0})
        </p>
        {/* Покажем количество карточек */}
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
          <div style={{ padding: "10px", color: "#94A6BE", fontSize: "14px" }}>
            Нет задач
          </div>
        )}
      </SCardsContainer>
    </SMainColumn>
  );
};

export default Column;
