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
  background-color: ${(props) => props.theme.colors.background};
  transition: background-color 0.3s ease;
`;

export const Title = styled.h1`
  font-size: 120px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  font-weight: 700;
`;

export const Text = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 30px;
  font-weight: 500;
`;

export const Description = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 30px;
  max-width: 500px;
  line-height: 1.6;
`;

export const HomeLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  padding: 12px 30px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;
