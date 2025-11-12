import React, { useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";

const PopUser = ({ isOpen, onClose, onLogout, onShowExitConfirm }) => {
  const popupRef = useRef(null);
  //const navigate = useNavigate();

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

  const handleLogoutClick = () => {
    onShowExitConfirm(); // Показываем подтверждение выхода
    //onLogout();
    onClose();
    //navigate("/sign-in");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={popupRef}
      className="header__pop-user-set pop-user-set"
      style={{
        display: "block",
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
      <p className="pop-user-set__name">Ivan Ivanov</p>
      <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox" />
      </div>
      <button
        type="button"
        className="_hover03"
        onClick={handleLogoutClick}
        style={{
          width: "72px",
          height: "30px",
          background: "transparent",
          color: "#565EEF",
          borderRadius: "4px",
          border: "1px solid #565EEF",
          cursor: "pointer",
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#565EEF';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#565EEF';
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default PopUser;
