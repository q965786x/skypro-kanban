import React from "react";
import { NotFoundContainer, Title, Text, HomeLink } from "./NotFound.styled";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Text>Страница не найдена</Text>
      <Description>
        Возможно, страница была удалена или вы перешли по неверной ссылке
      </Description>
      <HomeLink to="/">Вернуться на главную</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
