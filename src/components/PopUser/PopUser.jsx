import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/Theme";
import { useModal } from "../../context/Modal";
import {
  SPopupContainer,
  SUserName,
  SUserEmail,
  SThemeRow,
  SThemeLabel,
  SSwitchContainer,
  SSwitchBackground,
  SSwitchThumb,
  SExitButtonContainer,
  SExitButton,
} from "./PopUser.styled"

const PopUser = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useTheme();
  const { openModal, closeModal } = useModal();

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
      openModal('popuser');
      document.addEventListener("mousedown", popupClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      closeModal();
    }

    return () => {
      document.removeEventListener("mousedown", popupClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, openModal, closeModal]); // Убрали лишнюю запятую

  const handleExitClick = () => {
    navigate("/exit");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <SPopupContainer ref={popupRef} $isDarkTheme={isDarkTheme}>
      <div>
        <SUserName $isDarkTheme={isDarkTheme}>
          {user?.name || user?.login || "Пользователь"}
        </SUserName>
        <SUserEmail $isDarkTheme={isDarkTheme}>
          {user?.login || "email@example.com"}
        </SUserEmail>

        <SThemeRow $isDarkTheme={isDarkTheme} onClick={toggleTheme}>
          <SThemeLabel $isDarkTheme={isDarkTheme}>Темная тема</SThemeLabel>
          
          <SSwitchContainer>
            <SSwitchBackground $isDarkTheme={isDarkTheme} />
            <SSwitchThumb $isDarkTheme={isDarkTheme} />
          </SSwitchContainer>
        </SThemeRow>

        <SExitButtonContainer>
          <SExitButton onClick={handleExitClick}>
            Выйти
          </SExitButton>
        </SExitButtonContainer>
      </div>
    </SPopupContainer>
  );
};

export default PopUser;
