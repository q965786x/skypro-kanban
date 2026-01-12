import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

export const SCalendar = styled.div`
  // стили для .calendar
  max-width: 370px;
  width: 100%;
  position: relative;

  &.calendar-mobile {
    max-width: 343px;
    width: 100%;
    margin: 0 auto;
  }
`;

export const SCalendarTitle = styled.p`
  // стили для .calendar__ttl subttl
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
`;

export const SCalendarBlock = styled.div`
  // стили для .calendar__block
  width: 100%;
`;

export const SCalendarNav = styled.div`
  // стили для .calendar__nav
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
`;

export const SCalendarMonth = styled.div`
  // стили для .calendar__month
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  flex: 1;
`;

export const SCalendarContent = styled.div`
  // стили для .calendar__content
  width: 100%;
`;

export const SCalendarDaysNames = styled.div`
  // стили для .calendar__days-names
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 5px;
`;

export const SCalendarCells = styled.div`
  // стили для .calendar__cells
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const SNavActions = styled.div`
  // стили для .nav__actions
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;

  @media screen and (max-width: 495px) {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    gap: 15px;
  }
`;

export const SNavAction = styled.div`
  // стили для .nav__action
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${(props) => props.theme.colors.textSecondary};

    path {
      fill: ${(props) => props.theme.colors.textSecondary};
    }

    &:hover {
      animation: ${bounce} 0.3s ease;

      svg {
        fill: ${(props) => props.theme.colors.primary};

        path {
          fill: ${(props) => props.theme.colors.primary};
        }
      }
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

// Стили для мобильной версии
export const MobileStyles = styled.div`
  @media screen and (max-width: 495px) {
    ${SCalendar} {
      max-width: 343px;
      width: 100%;
      padding: 15px;
      border: 1px solid #e6e9ef;
      border-radius: 10px;
      margin: 0 auto 20px;
    }

    ${SCalendarTitle} {
      font-size: 16px;
      text-align: left; /* Название слева */
      margin-bottom: 15px;
      color: #94a6be;
      font-weight: 600;
    }

    ${SCalendarMonth} {
      font-size: 16px;
      font-weight: 600;
      color: #94a6be;
    }

    ${SCalendarDaysNames} {
      gap: 4px;
      margin-bottom: 10px;
    }

    ${SCalendarCells} {
      gap: 4px;
    }

    /* Анимация при переключении месяцев */
    .calendar__month {
      animation: ${fadeIn} 0.3s ease;
    }
  }
`;

// Анимационный компонент
export const AnimatedMonth = styled.div`
  animation: ${fadeIn} 0.3s ease;
`;
