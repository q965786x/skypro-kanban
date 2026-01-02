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
    #565eef,
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
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  min-height: 300px;
`;

export const SLoadingText = styled.p`
  font-size: 18px;
  color: #565eef;
  font-weight: 500;
  margin-top: 10px;
`;

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

/*export const SLoadingContainer = styled.div`
  // стили для .loading-container
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
`; */

/*export const SLoadingText = styled.div`
  // стили для .loading-text
  font-size: 24px;
  font-weight: 600;
  color: #565eef;
  text-align: center;
  animation: pulse 1.5s ease-in-out infinite;
`; */

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


