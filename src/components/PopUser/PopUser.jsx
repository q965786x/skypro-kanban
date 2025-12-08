import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PopUser = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log("Тема изменена на:", !isDarkTheme ? "темная" : "светлая");
  };

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
    <div
      ref={popupRef}
      className="header__pop-user pop-user"
      style={{
        display: isOpen ? "block" : "none",
        position: "absolute",
        top: "61px",
        right: "0",
        width: "213px",
        height: "205px",
        borderRadius: "10px",
        border: "0.7px solid rgba(148, 166, 190, 0.4)",
        background: "#FFF",
        boxShadow: "0px 10px 39px 0px rgba(26, 56, 101, 0.21)",
        padding: "34px",
        textAlign: "center",
        zIndex: "1000",
      }}
    >
      <div className="pop-user__set">
        {/* Информация о пользователе */}
        <div className="pop-user-set__name">
          {user?.name || user?.login || "Пользователь"}
        </div>
        <div className="pop-user-set__mail">
          {user?.login || "email@example.com"}
        </div>

        {/* Переключатель темы */}
        <div className="pop-user-set__theme">
          <p>Темная тема</p>
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={handleThemeToggle}
          />
        </div>

        {/* Используем handleExitClick вместо onLogout */}
        <button
          className="pop-user__exit _btn-bor _hover03"
          style={{
            width: "72px",
            height: "30px",
            background: "transparent",
            borderRadius: "4px",
            border: "1px solid #565EEF",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "10px",
            textAlign: "center",
            color: "#565EEF",
          }}
          onClick={handleExitClick}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default PopUser;
