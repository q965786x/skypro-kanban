import styled from "styled-components";

export const SMain = styled.main`
  // стили для Main
  width: 100%;
  background-color: #eaeef6;
`;

export const SMainBlock = styled.div`
  // стили для main__block
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }
`;

export const SMainContent = styled.div`
  // стили для .main__content
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const SLoadingContainer = styled.div`
  // стили для .loading-container
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
`;

export const SLoadingText = styled.div`
  // стили для .loading-text
  font-size: 24px;
  font-weight: 600;
  color: #565eef;
  text-align: center;
  animation: pulse 1.5s ease-in-out infinite;
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
  color: #565eef;
  font-weight: 600;
`;

export const AddCardButton = styled.button`
  padding: 10px 20px;
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;

  &:hover {
    background-color: #33399b;
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
`;

export const SErrorText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ff4444;
  text-align: center;
`;

export const SRetryButton = styled.button`
  padding: 10px 20px;
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #33399b;
  }
`;

export const SOfflineIndicator = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ffeeba;
  font-size: 14px;
  font-weight: 500;
`;

export const SLoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #eaeef6;
  border-top: 5px solid #565eef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
