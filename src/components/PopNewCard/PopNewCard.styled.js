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
`;

export const SPopNewCardContainer = styled.div`
  //стили для .pop-new-card__container
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SPopNewCardBlock = styled.div`
  
  //стили для .pop-new-card__block
  display: block;
  margin: 0 auto;
  background-color: #FFFFFF;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  position: relative;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const SPopNewCardContent = styled.div`
  //стили для .pop-new-card_content
  display: block;
  text-align: left;
`;

export const SPopNewCardTtl = styled.h3`
  //стили для .pop-new-card__ttl
  display: block;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const SPopNewCardClose = styled.a`
  //стили для .pop-new-card__close
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94A6BE;  
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #000000;
  }
`;

export const SPopNewCardWrap = styled.div`
  //стили для .pop-new-card__wrap 
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  
  @media screen and (max-width: 660px) {
    display: block;
  }
`;

export const SFormNew = styled.form`
  //стили для .pop-new-card__form
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

export const SFormNewBlock = styled.div`
  //стили для .form-new__block
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SFormNewInput = styled.input`
  //стили для .form-new__input, .form-new__area
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94A6BE;
    letter-spacing: -0.14px;
  }
`;

export const SFormNewArea = styled.textarea`
  width: 100%;
  max-width: 370px;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94A6BE;
    letter-spacing: -0.14px;
  }
`;

export const SFormNewCreate = styled.button`
  //стили для .form-new__create
  width: 132px;
  height: 30px;
  background-color: #565EEF;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  float: right;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #33399b;
  }
`;

export const SCategories = styled.div`
  margin-bottom: 20px;
  clear: both;
`;

export const SCategoriesP = styled.p`
  margin-bottom: 14px;
`;

export const SCategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
`;

export const SCategoriesTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &._active-category {
    opacity: 1 !important;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;