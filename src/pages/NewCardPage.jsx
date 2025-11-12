import React from "react";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import {
  NewCardContainer,
  Header,
  Title,
  BackLink,
} from "./NewCardPage.styled";

const NewCardPage = () => {
  return (
    <NewCardContainer>
      <Header>
        <Title>Создание новой задачи</Title>
        <BackLink to="/">← Назад к доске</BackLink>
      </Header>
      <PopNewCard />
    </NewCardContainer>
  );
};

export default NewCardPage;
