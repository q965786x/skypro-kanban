import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUser from "../PopUser/PopUser";
import { AuthContext } from "../../context/AuthContext";
import { useModal } from "../../context/Modal";
import {
  SHeader,
  SContainer,
  SHeaderBlock,
  SHeaderLogo,
  SHeaderNav,
  SHeaderButton,
  SHeaderUser,
} from "./Header.styled";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { isModalOpen } = useModal();
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 495);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);


  const handleClick = () => {
    setIsModalWindowOpen(!isModalWindowOpen);
  };

  const closeModalWindow = () => {
    setIsModalWindowOpen(false);
  };

  return (
    <SHeader>
      <SContainer>
        <SHeaderBlock>
          <SHeaderLogo className="_show _light">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA4NSA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijg1IiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzU2NUVFRiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIj5MT0dPPC90ZXh0Pgo8L3N2Zz4=";
                }}
                style={{
                  width: "85px",
                  height: "auto",
                  display: "block",
                }}
              />
            </Link>
          </SHeaderLogo>
          <SHeaderLogo style={{ display: "none" }} className="_dark">
            <Link to="/">
              <img
                src="/images/logo_dark.png"
                alt="logo"
                style={{
                  width: "85px",
                  height: "auto",
                  display: "block",
                }}
              />
            </Link>
          </SHeaderLogo>
          <SHeaderNav>
            {/* ТОЛЬКО ДЕСКТОПНАЯ ВЕРСИЯ: кнопка в Header */}
            {!isMobile && (
              <SHeaderButton className="_hover01">
                <Link to="card/new">Создать новую задачу</Link>
              </SHeaderButton>
            )}

            {/* МОБИЛЬНАЯ ВЕРСИЯ: кнопка НЕ отображается в Header */}
            {/* Вместо нее будет плавающая кнопка внизу страницы через MobileCreateButton */}

            <SHeaderUser className="_hover02" onClick={handleClick}>
              {user?.name || user?.login || "Пользователь"}
            </SHeaderUser>
            <PopUser isOpen={isModalWindowOpen} onClose={closeModalWindow} />
          </SHeaderNav>
        </SHeaderBlock>
      </SContainer>
    </SHeader>
  );
};

export default Header;
