import React from "react";
import Card from "../Card/Card";
import { SMainColumn, SColumnTitle } from "./Column.styled";
import { SCardsContainer } from "../Card/Card.styled";

const Column = ({ title, cards }) => {
  
  return (
    <SMainColumn>
      <SColumnTitle>
        <p>{title}</p>
      </SColumnTitle>
      <SCardsContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
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
