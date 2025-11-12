import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUser from "../PopUser/PopUser";
import {
  SHeader,
  SContainer,
  SHeaderBlock,
  SHeaderLogo,
  SHeaderNav,
  SHeaderButton,
  SHeaderUser,
} from "./Header.styled";

const Header = ({ onLogout, onShowExitConfirm }) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

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
              <img src="images/logo.png" alt="logo" />
            </Link>
          </SHeaderLogo>
          <SHeaderLogo className="_dark">
            <Link to="/">
              <img src="images/logo_dark.png" alt="logo" />
            </Link>
          </SHeaderLogo>
          <SHeaderNav>
            <SHeaderButton className="_hover01">
              <Link to="/card/new">Создать новую задачу</Link>
            </SHeaderButton>
            <SHeaderUser className="_hover02" onClick={handleClick}>
              Ivan Ivanov
            </SHeaderUser>
            <PopUser
              isOpen={isModalWindowOpen}
              onClose={closeModalWindow}
              onShowExitConfirm={onShowExitConfirm}
              //onLogout={onLogout}
            />
          </SHeaderNav>
        </SHeaderBlock>
      </SContainer>
    </SHeader>
  );
};

export default Header;
