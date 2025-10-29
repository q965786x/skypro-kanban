import React, { useEffect, useRef } from "react";

const PopUser = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    console.log("PopUser useEffect, isOpen:", isOpen);

    const popupClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        console.log("Escape pressed, closing popup");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", popupClickOutside);
      document.addEventListener("keydown", handleEscape);
      console.log("Event listeners added");
    }

    return () => {
      document.removeEventListener("mousedown", popupClickOutside);
      document.removeEventListener("keydown", handleEscape);
      console.log("Event listeners removed");
    };
  }, [isOpen, onClose]);

  console.log("PopUser render, isOpen:", isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      ref={popupRef} 
      className="header__pop-user-set pop-user-set"
      style={{ 
        display: 'block',
        position: 'absolute',
        top: '61px',
        right: '0',
        width: '213px',
        height: '205px',
        borderRadius: '10px',
        border: '0.7px solid rgba(148, 166, 190, 0.4)',
        background: '#FFF',
        boxShadow: '0px 10px 39px 0px rgba(26, 56, 101, 0.21)',
        padding: '34px',
        textAlign: 'center',
        zIndex: '1000'
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
        onClick={onClose}
        style={{ 
          width: '72px', 
          height: '30px', 
          background: 'transparent', 
          color: '#565EEF', 
          borderRadius: '4px', 
          border: '1px solid #565EEF',
          cursor: 'pointer'
        }}
      >
        <a href="#popExit" style={{ color: '#565EEF' }}>Выйти</a>
      </button>
    </div>
  );
};

export default PopUser;
