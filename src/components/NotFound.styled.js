import { Link } from "react-router-dom";
import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 40px 20px;
  background-color: #eaeef6;
`;

export const Title = styled.h1`
  font-size: 120px;
  color: #565eef;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const Text = styled.p`
  font-size: 24px;
  color: #000;
  margin-bottom: 30px;
  font-weight: 500;
`;

export const HomeLink = styled(Link)`
  color: #565eef;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 30px;
  border: 2px solid #565eef;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #565eef;
    color: white;
  }
`;
