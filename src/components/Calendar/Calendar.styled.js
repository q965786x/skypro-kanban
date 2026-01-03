import styled from 'styled-components';

export const SCalendar = styled.div `
// стили для .calendar
    width: 182px;
    margin-bottom: 20px;
`;

export const SCalendarTitle = styled.p `
// стили для .calendar__ttl subttl
    margin-bottom: 14px;
    padding: 0 7px;
    color: ${props => props.theme.colors.text};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
`;

export const SCalendarBlock = styled.div `
// стили для .calendar__block 
    display: block;
`;

export const SCalendarNav = styled.div `
// стили для .calendar__nav
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 7px;
`;

export const SCalendarMonth = styled.div `
// стили для .calendar__month
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const SCalendarContent = styled.div `
// стили для .calendar__content
    margin-bottom: 12px;
`;

export const SCalendarDaysNames = styled.div `
// стили для .calendar__days-names
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;
`;

export const SCalendarCells = styled.div `
// стили для .calendar__cells
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;
`;

export const SNavActions = styled.div `
// стили для .nav__actions
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SNavAction = styled.div `
// стили для .nav__action
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
    fill: ${props => props.theme.colors.textSecondary};
    
    path {
      fill: ${props => props.theme.colors.textSecondary};
    }
  }
`;

