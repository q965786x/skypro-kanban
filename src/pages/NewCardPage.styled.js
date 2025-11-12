import styled from "styled-components";
import { Link } from "react-router-dom";

export const NewCardContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  color: #000;
`;

export const BackLink = styled(Link)`
  color: #565eef;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
