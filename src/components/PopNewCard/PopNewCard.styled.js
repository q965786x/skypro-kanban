import styled from "styled-components";

export const SPopNewCard = styled.div`
  //стили для .pop-new-card
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: block;
  overflow-y: auto;
  padding-top: 94px;

  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  @media screen and (max-width: 495px) {
    top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    min-height: calc(100vh - 60px);
    padding-top: 0;
    background: ${(props) =>
      props.theme.mode === "dark" ? "#151419" : props.theme.colors.background};
  }
`;

export const SPopNewCardContainer = styled.div`
  //стили для .pop-new-card__container
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 94px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 495px) {
    padding: 0;
    min-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
    margin-top: 0;
  }
`;

export const SPopNewCardBlock = styled.div`
  //стили для .pop-new-card__block
  display: block;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.surface};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${(props) => props.theme.colors.border};
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.medium};
  max-height: calc(100vh - 140px);
  overflow-y: auto;

  @media screen and (max-width: 495px) {
    margin: 0 auto;
    border-radius: 10px;
    padding: 20px 16px;
    box-shadow: ${(props) => props.theme.shadows.medium};
    max-width: 100%;
    border: 0.7px solid ${(props) => props.theme.colors.border};
    display: block;
    max-height: calc(100vh - 80px);
  }
`;

export const SPopNewCardContent = styled.div`
  //стили для .pop-new-card_content
  display: block;
  text-align: left;

  @media screen and (max-width: 495px) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const SPopNewCardTtl = styled.h3`
  //стили для .pop-new-card__ttl
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    font-size: 18px;
    margin-bottom: 15px;
    text-align: left;
  }
`;

export const SPopNewCardClose = styled.a`
  //стили для .pop-new-card__close
  position: absolute;
  top: 20px;
  right: 30px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }

  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const SPopNewCardWrap = styled.div`
  //стили для .pop-new-card__wrap
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: 495px) {
    display: block;
    padding: 0;
  }
`;

export const SFormNew = styled.form`
  //стили для .pop-new-card__form
  width: 100%;
  display: block;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

export const SFormNewBlock = styled.div`
  //стили для .form-new__block
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 495px) {
    margin-bottom: 15px;
  }
`;

export const SFormNewInput = styled.input`
  //стили для .form-new__input, .form-new__area
  width: 100%;
  max-width: 370px;
  height: 37px;
  outline: none;
  padding: 0 15px;
  background: ${(props) => props.theme.colors.background};
  border: 0.7px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  color: ${(props) => props.theme.colors.text};
  transition: border-color 0.3s ease;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    width: 343px;
    height: 37px;
    line-height: 1;
    letter-spacing: -0.14px;
    margin-bottom: 10px;
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const SFormNewArea = styled.textarea`
  width: 100%;
  max-width: 370px;
  height: 200px;
  outline: none;
  padding: 10px;
  background: ${(props) => props.theme.colors.background};
  border: 0.7px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  resize: vertical;
  font-family: inherit;
  text-align: left;
  color: ${(props) => props.theme.colors.text};
  transition: border-color 0.3s ease;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    width: 343px;
    height: 37px;
    line-height: 1;
    letter-spacing: -0.14px;
    margin-bottom: 10px;
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.background};
    cursor: not-allowed;
  }
`;

export const SCategories = styled.div`
  margin-bottom: 20px;
  clear: both;

  @media screen and (max-width: 495px) {
    margin-bottom: 20px;
    padding: 0 16px;
  }
`;

export const SCategoriesP = styled.p`
  margin-bottom: 14px;
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: 495px) {
    font-size: 14px;
    margin-bottom: 12px;
    text-align: left;
  }
`;

export const SCategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;

  @media screen and (max-width: 495px) {
    justify-content: center;
    gap: 7px;
    flex-wrap: nowrap;
  }
`;

export const SCategoriesTheme = styled.div.withConfig({
  shouldForwardProp: (prop) => !["active", "disabled"].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 8px 20px;
  border-radius: 24px;
  opacity: ${(props) => (props.disabled ? "0.7" : props.active ? "1" : "0.4")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  min-width: 120px;

  &._active-category {
    opacity: 1 !important;
    transform: scale(1.05);
  }

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  @media screen and (max-width: 495px) {
    height: 30px;
    padding: 8px 20px;
    min-width: 100px;
    font-size: 14px;
  }

  ${(props) =>
    props.className &&
    props.className.includes("_orange") &&
    `
    background-color: ${props.theme.mode === "dark" ? "#4a2c00" : "#FFE4C2"};
    border: ${props.active ? "2px solid #FF6D00" : "none"};

    p._orange {
      color: ${props.theme.mode === "dark" ? "#ffb347" : "#FF6D00"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
      
      @media screen and (max-width: 495px) {
        font-size: 14px;
      }
    }
  `}

  ${(props) =>
    props.className &&
    props.className.includes("_green") &&
    `
    background-color: ${props.theme.mode === "dark" ? "#004d2a" : "#B4FDD1"};
    border: ${props.active ? "2px solid #06B16E" : "none"};

    p._green {
      color: ${props.theme.mode === "dark" ? "#00e676" : "#06B16E"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
      
      @media screen and (max-width: 495px) {
        font-size: 14px;
      }
    }
  `}

  ${(props) =>
    props.className &&
    props.className.includes("_purple") &&
    `
    background-color: ${props.theme.mode === "dark" ? "#3a1d66" : "#E9D4FF"};
    border: ${props.active ? "2px solid #9A48F1" : "none"};

    p._purple {
      color: ${props.theme.mode === "dark" ? "#bb86fc" : "#9A48F1"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
      
      @media screen and (max-width: 495px) {
        font-size: 14px;
      }
    }
  `}
`;

export const SFormNewBtnCreate = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isMobile',
})`
  //стили для .form-new__create
  width: 132px !important;
  height: 30px !important;
  background-color: ${(props) => props.theme.colors.primary} !important;
  border-radius: 4px !important;
  border: 0 !important;
  outline: none !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  color: #ffffff !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease;
  float: right;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover} !important;
  }

  &:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }

  @media screen and (max-width: 495px) {
    width: 343px !important;
    height: 40px !important;
    font-size: 14px !important;
    border-radius: 4px !important;
    margin: 20px auto !important;
    position: static !important;
    float: none !important;
  }
`;
