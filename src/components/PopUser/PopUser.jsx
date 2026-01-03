import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/Theme";
import styled from "styled-components";

const PopupContainer = styled.div`
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

const UserName = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#FFFFFF" : "#000000")};
  font-size: 14px;
  line-height: 18px;
`;

const UserEmail = styled.div`
  color: #94A6BE;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.14px;
`;

const ThemeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ $isDarkTheme }) => 
    $isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(148, 166, 190, 0.4)"};
  cursor: pointer;
`;

const ThemeLabel = styled.span`
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#FFFFFF" : "#000000")};
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.14px;
`;

const SwitchContainer = styled.div`
  position: relative;
  width: 24px;
  height: 13px;
`;

const SwitchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#565EEF" : "#94A6BE")};
  border-radius: 10px;
  transition: background-color 0.3s ease;
`;

const SwitchThumb = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  background-color: #FFFFFF;
  border-radius: 50%;
  top: 1px;
  left: ${({ $isDarkTheme }) => ($isDarkTheme ? "12px" : "1px")};
  transition: left 0.3s ease;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ExitButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  border-radius: 4px;
  border: 1px solid #565EEF;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #565EEF;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #565EEF;
    color: #FFFFFF;
  }
`;


const PopUser = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const popupClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", popupClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", popupClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleExitClick = () => {
    navigate("/exit");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PopupContainer ref={popupRef} $isDarkTheme={isDarkTheme}>
      <div>
        <UserName $isDarkTheme={isDarkTheme}>
          {user?.name || user?.login || "Пользователь"}
        </UserName>
        <UserEmail $isDarkTheme={isDarkTheme}>
          {user?.login || "email@example.com"}
        </UserEmail>

        <ThemeRow $isDarkTheme={isDarkTheme} onClick={toggleTheme}>
          <ThemeLabel $isDarkTheme={isDarkTheme}>Темная тема</ThemeLabel>
          
          <SwitchContainer>
            <SwitchBackground $isDarkTheme={isDarkTheme} />
            <SwitchThumb $isDarkTheme={isDarkTheme} />
          </SwitchContainer>
        </ThemeRow>

        <ExitButtonContainer>
          <ExitButton onClick={handleExitClick}>
            Выйти
          </ExitButton>
        </ExitButtonContainer>
      </div>
    </PopupContainer>
  );
};

export default PopUser;
