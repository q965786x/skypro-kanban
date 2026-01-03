import styled, { keyframes } from "styled-components";

const gradientRotate = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const SLoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${props => props.theme.colors.primary},
    #6a73ff,
    #8a94ff,
    #aab3ff,
    #c9ceff
  );
  background-size: 400% 400%;
  animation: ${gradientRotate} 1.5s ease infinite;
  margin: 0 auto 20px;
  box-shadow: 0 4px 10px rgba(86, 94, 239, 0.3);
`;

export const SLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: ${props => props.theme.mode === 'dark' ? '#1E1E1E' : props.theme.colors.surface};
  border-radius: 10px;
  margin-top: 20px;
  min-height: 300px;
  border: ${props => props.theme.mode === 'dark' ? '1px solid #2D2D2D' : 'none'};
`;

export const SLoadingText = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-top: 10px;
`;

export const SMain = styled.main`
  // стили для Main
  width: 100%;
  background-color: ${props => props.theme.mode === 'dark' ? '#151419' : props.theme.colors.background};
  min-height: calc(100vh - 94px);
  transition: background-color 0.3s ease;
  padding: 20px 0;
`;

export const SMainBlock = styled.div`
  // стили для main__block
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
  transition: all 0.3s ease;

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }
`;

export const SMainContent = styled.div`
  // стили для .main__content
  width: 100%;
  display: flex;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
`;

export const WelcomeText = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

export const AddCardButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(86, 94, 239, 0.3);
  }
`;

export const SErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  gap: 20px;
  background: ${props => props.theme.colors.background};
`;

export const SErrorText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.error};
  text-align: center;
`;

export const SRetryButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;

export const SOfflineIndicator = styled.div`
  background: ${props => props.theme.mode === 'dark' ? '#2A2A36' : '#fff3cd'};
  color: ${props => props.theme.mode === 'dark' ? '#ffcc00' : '#856404'};
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#ffcc00' : '#ffeeba'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
`;
