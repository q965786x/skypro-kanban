import React from "react";
import { useParams } from "react-router-dom";
import {
  CardPageContainer,
  CardContent,
  Title,
  CardId,
  BackLink,
} from "./CardPage.styled";

const CardPage = () => {
  const { id } = useParams();

  return (
    <CardPageContainer>
      <CardContent>
        <Title>Просмотр карточки</Title>
        <CardId>ID карточки: {id}</CardId>
        <BackLink to="/">← Назад к доске</BackLink>
      </CardContent>
    </CardPageContainer>
  );
};

export default CardPage;
