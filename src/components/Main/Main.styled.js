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
    ${(props) => props.theme.colors.primary},
    #6a73ff,
    #8a94ff,
    #aab3ff,
    #c9ceff
  );
  background-size: 400% 400%;
  animation: ${gradientRotate} 1.5s ease infinite;
  margin: 0 auto 20px;
  box-shadow: 0 4px 10px rgba(86, 94, 239, 0.3);

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 495px) {
    width: 40px;
    height: 40px;
  }
`;

export const SLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: ${(props) =>
    props.theme.mode === "dark" ? "#1E1E1E" : props.theme.colors.surface};
  border-radius: 10px;
  margin-top: 20px;
  min-height: 300px;
  border: ${(props) =>
    props.theme.mode === "dark" ? "1px solid #2D2D2D" : "none"};

  @media screen and (max-width: 1200px) {
    padding: 50px 40px;
    min-height: 250px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 30px;
    min-height: 200px;
    margin-top: 15px;
  }

  @media screen and (max-width: 495px) {
    padding: 30px 20px;
    min-height: 180px;
    margin-top: 10px;
    border-radius: 8px;
  }
`;

export const SLoadingText = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 495px) {
    font-size: 14px;
  }
`;

export const SMain = styled.main`
  // стили для Main
  width: 100%;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#151419" : props.theme.colors.background};
  min-height: calc(100vh - 94px);
  transition: background-color 0.3s ease;
  padding: 94px 0 20px 0; /* Увеличиваем верхний padding */

  /* Планшет (768px - 1200px) */
  @media screen and (max-width: 1200px) {
    padding: 80px 0 20px 0;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    padding: 60px 0 20px 0;
  }

  @media screen and (max-width: 375px) {
    padding: 55px 0 20px 0;
  }
`;

export const SMainBlock = styled.div`
  // стили для main__block
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
  transition: all 0.3s ease;

  /* Десктоп большой */
  @media screen and (min-width: 1440px) {
    max-width: 1400px;
  }

  /* Десктоп обычный */
  @media screen and (max-width: 1440px) {
    padding: 20px 30px 40px;
  }

  /* Планшет горизонтальный (992px - 1200px) */
  @media screen and (max-width: 1200px) {
    padding: 20px 25px 35px;
  }

  /* Планшет вертикальный (768px - 991px) */
  @media screen and (max-width: 991px) {
    padding: 15px 20px 30px;
  }

  /* Мобильные (до 495px) */
  @media screen and (max-width: 495px) {
    padding: 10px 15px 25px;
  }

  @media screen and (max-width: 375px) {
    padding: 8px 12px 20px;
  }
`;

export const SMainContent = styled.div`
  // стили для .main__content
  width: 100%;
  display: flex;
  gap: 20px;

  /* Десктоп большой - больше отступов */
  @media screen and (min-width: 1440px) {
    gap: 24px;
  }

  /* Планшет горизонтальный (992px - 1200px) */
  @media screen and (max-width: 1200px) {
    gap: 18px;
  }

  /* Планшет вертикальный (768px - 991px) */
  @media screen and (max-width: 991px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-bottom: 20px;
  }

  /* Мобильные средние (496px - 767px) */
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 14px;
    padding-bottom: 15px;
  }

  /* Мобильные маленькие (до 495px) */
  @media screen and (max-width: 495px) {
    gap: 12px;
    padding-bottom: 12px;
  }

  @media screen and (max-width: 375px) {
    gap: 10px;
    padding-bottom: 10px;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;

  /* Планшет */
  @media screen and (max-width: 991px) {
    margin-bottom: 25px;
    padding: 0 15px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    margin-bottom: 20px;
    padding: 0 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const WelcomeText = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;

  /* Планшет */
  @media screen and (max-width: 991px) {
    font-size: 22px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    font-size: 20px;
  }
`;

export const AddCardButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(86, 94, 239, 0.3);
  }

  /* Планшет */
  @media screen and (max-width: 991px) {
    padding: 9px 18px;
    font-size: 13px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    padding: 8px 16px;
    font-size: 12px;
    width: 100%;
    text-align: center;
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
  background: ${(props) => props.theme.colors.background};

  /* Планшет */
  @media screen and (max-width: 991px) {
    height: 350px;
    gap: 15px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    height: 300px;
    gap: 12px;
  }
`;

export const SErrorText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.error};
  text-align: center;

  /* Планшет */
  @media screen and (max-width: 991px) {
    font-size: 16px;
    padding: 0 20px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    font-size: 14px;
    padding: 0 15px;
  }
`;

export const SRetryButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  /* Планшет */
  @media screen and (max-width: 991px) {
    padding: 9px 18px;
    font-size: 13px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export const SOfflineIndicator = styled.div`
  background: ${(props) =>
    props.theme.mode === "dark" ? "#2A2A36" : "#fff3cd"};
  color: ${(props) => (props.theme.mode === "dark" ? "#ffcc00" : "#856404")};
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "#ffcc00" : "#ffeeba")};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  /* Планшет */
  @media screen and (max-width: 991px) {
    padding: 10px 15px;
    font-size: 13px;
    margin-bottom: 15px;
  }

  /* Мобильные */
  @media screen and (max-width: 495px) {
    padding: 8px 12px;
    font-size: 12px;
    margin-bottom: 12px;
  }
`;
