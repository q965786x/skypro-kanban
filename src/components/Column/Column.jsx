import React from "react";
import Card from "../Card/Card";
import { SMainColumn, SColumnTitle } from "./Column.styled";
import { SCardsContainer } from "../Card/Card.styled";

const Column = ({ title, cards }) => {
  
  return (
    <SMainColumn>
      <SColumnTitle>
        <p>{title} ({cards.length})</p> {/* Покажем количество карточек */}
      </SColumnTitle>
      <SCardsContainer>
        {cards.map((card) => (
  <Card
    key={card._id || card.id} 
    id={card._id || card.id}
    topic={card.topic}
    title={card.title}
    date={card.date}
  />
        ))}
      </SCardsContainer>
    </SMainColumn>
  );
};

export default Column;
