import styled from "styled-components";

export const SPopExit = styled.div`
  // стили для .pop-exit
  display: none;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.4);
`;

export const SPopExitContainer = styled.div`
  // стили для .pop-exit__container
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SPopExitBlock = styled.div`
  // стили для .pop-exit__block
  display: block;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.surface};
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const SPopExitFormGroup = styled.div`
  // стили для .pop-exit__form-group
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

    @media screen and (max-width: 495px) {
      display: flex;
      flex-direction: column;
    }

  .pop-exit__exit-yes {
    width: 153px;
    height: 30px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 4px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: #ffffff;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
    }

    span {
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .pop-exit__exit-no {
    width: 153px;
    height: 30px;
    background-color: transparent;
    border-radius: 4px;
    border: 0.7px solid ${props => props.theme.colors.primary};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    letter-spacing: -0.14px;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: #ffffff;
    }

    span {
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
