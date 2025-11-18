import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardPageContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const CardContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #000;
  margin-bottom: 20px;
`;

export const CardId = styled.p`
  color: #565eef;
  font-size: 18px;
  margin-bottom: 20px;
`;

export const BackLink = styled(Link)`
  color: #565eef;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
