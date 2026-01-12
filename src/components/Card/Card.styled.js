import styled from "styled-components";

export const SCardsContainer = styled.div`
  // стили для .cards
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 5px;
  margin-bottom: 10px;

  @media screen and (min-width: 1201px) {
    display: block;
    overflow-x: visible;
    padding: 0;
    margin-bottom: 0;
  }
`;

export const SCardsItem = styled.div`
  // стили для .cards__item

  flex: 0 0 auto;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media screen and (min-width: 1201px) {
    padding: 5px;
  }
`;

export const SCardsCard = styled.div`
  // стили для .cards__card
  width: 220px;
  height: 130px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1E1E1E" : "#FFFFFF"};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${(props) => props.theme.shadows.small};
  border: ${(props) =>
    props.theme.mode === "dark" ? "1px solid #2D2D2D" : "none"};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.medium};
    transform: translateY(-2px);
  }

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
  }

  @media screen and (max-width: 495px) {
    width: 220px;
    height: 130px;
    padding: 12px 10px 15px;
  }

  @media screen and (max-width: 375px) {
    width: 220px;
    height: 130px;
    padding: 10px 8px 12px;
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
  background-color: ${(props) => {
    if (props.theme.mode === "dark") {
      switch (props.topic) {
        case "Web Design":
          return "#2D2319";
        case "Research":
          return "#0D2D1C";
        case "Copywriting":
          return "#2A1B3D";
        default:
          return "#2D2319";
      }
    } else {
      switch (props.topic) {
        case "Web Design":
          return "#FFE4C2";
        case "Research":
          return "#B4FDD1";
        case "Copywriting":
          return "#E9D4FF";
        default:
          return "#FFE4C2";
      }
    }
  }};
  color: ${(props) => {
    if (props.theme.mode === "dark") {
      switch (props.topic) {
        case "Web Design":
          return "#FFA726";
        case "Research":
          return "#4CAF50";
        case "Copywriting":
          return "#9C27B0";
        default:
          return "#FFA726";
      }
    } else {
      switch (props.topic) {
        case "Web Design":
          return "#FF6D00";
        case "Research":
          return "#06B16E";
        case "Copywriting":
          return "#9A48F1";
        default:
          return "#FF6D00";
      }
    }
  }};

  padding: 5px 14px;
  border-radius: 18px;
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  transition: all 0.3s ease;
`;

export const SCardButton = styled.div`
  // стили для .card__btn
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.textSecondary};
    transition: background-color 0.3s ease;
  }

  &:hover div {
    background-color: ${(props) => props.theme.colors.primary};
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
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
`;

export const SCardDate = styled.div`
  // стили для .card__date
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;

    path {
      stroke: ${(props) => props.theme.colors.textSecondary};
      transition: stroke 0.3s ease;
    }
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${(props) => props.theme.colors.textSecondary};
    letter-spacing: 0.2px;
    transition: color 0.3s ease;
  }
`;

export const SDraggingCard = styled(SCardsCard)`
  transform: rotate(3deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: 0.8;
`;

export const SDropPreview = styled.div`
  background: rgba(86, 94, 239, 0.1);
  border: 2px dashed #565eef;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  transition: all 0.3s ease;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #565eef;
`;
