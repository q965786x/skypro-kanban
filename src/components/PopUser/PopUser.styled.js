import styled from "styled-components";

export const SPopupContainer = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: ${({ $isDarkTheme }) => ($isDarkTheme ? "#20202C" : "#FFF")};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: left;
  z-index: 1000;
  transition: all 0.3s ease;
`;

export const SUserName = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#FFFFFF" : "#000000")};
  font-size: 14px;
  line-height: 18px;
`;

export const SUserEmail = styled.div`
  color: #94a6be;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.14px;
`;

export const SThemeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid
    ${({ $isDarkTheme }) =>
      $isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(148, 166, 190, 0.4)"};
  cursor: pointer;
`;

export const SThemeLabel = styled.span`
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#FFFFFF" : "#000000")};
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.14px;
`;

export const SSwitchContainer = styled.div`
  position: relative;
  width: 24px;
  height: 13px;
`;

export const SSwitchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ $isDarkTheme }) =>
    $isDarkTheme ? "#565EEF" : "#94A6BE"};
  border-radius: 10px;
  transition: background-color 0.3s ease;
`;

export const SSwitchThumb = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  background-color: #ffffff;
  border-radius: 50%;
  top: 1px;
  left: ${({ $isDarkTheme }) => ($isDarkTheme ? "12px" : "1px")};
  transition: left 0.3s ease;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`;

export const SExitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const SExitButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  border-radius: 4px;
  border: 1px solid #565eef;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #565eef;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
  }
`;
