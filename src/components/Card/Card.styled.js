import styled from "styled-components";

export const SCardsContainer = styled.div`
  // стили для .cards
  width: 100%;
  display: block;
  position: relative;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    overflow-y: auto;
  }
`;

export const SCardsItem = styled.div`
  // стили для .cards__item
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

export const SCardsCard = styled.div`
  // стили для .cards__card
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }
`;

export const SCardGroup = styled.div`
  // стили для .card__group
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SCardTheme = styled.div`
  // стили для .card__theme
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) => {
    switch (props.$topic) {
      case "Web Design":
        return "#FFE4C2";
      case "Research":
        return "#B4FDD1";
      case "Copywriting":
        return "#E9D4FF";
      default:
        return "#FFE4C2";
    }
  }};
  color: ${(props) => {
    switch (props.$topic) {
      case "Web Design":
        return "#FF6D00";
      case "Research":
        return "#06B16E";
      case "Copywriting":
        return "#9A48F1";
      default:
        return "#FF6D00";
    }
  }};

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const SCardButton = styled.div`
  // стили для .card__btn
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
  }
`;

export const SCardContent = styled.div`
  // стили для .card__content
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SCardTitle = styled.h3`
  // стили для .card__title
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
`;

export const SCardDate = styled.div`
  // стили для .card__date
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94a6be;
    letter-spacing: 0.2px;
  }
`;
