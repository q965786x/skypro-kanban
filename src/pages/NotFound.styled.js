import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #565eef;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  font-size: 18px;
  color: #94a6be;
  margin-bottom: 30px;
`;

export const HomeLink = styled.a`
  color: #565eef;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border: 2px solid #565eef;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #565eef;
    color: white;
  }
`;
