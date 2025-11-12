import React from "react";
import { NotFoundContainer, Title, Text, HomeLink } from "./NotFound.styled";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Text>Страница не найдена</Text>
      <HomeLink href="/">Вернуться на главную</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
