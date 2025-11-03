import React, { useState } from "react";
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

const Header = () => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

  const handleClick = () => {
    console.log("Toggle clicked, current state:", isModalWindowOpen);
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
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </SHeaderLogo>
          <SHeaderLogo className="_dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </SHeaderLogo>
          <SHeaderNav>
            <SHeaderButton className="_hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </SHeaderButton>
            <SHeaderUser className="_hover02" onClick={handleClick}>
              Ivan Ivanov
            </SHeaderUser>
            <PopUser isOpen={isModalWindowOpen} onClose={closeModalWindow} />
          </SHeaderNav>
        </SHeaderBlock>
      </SContainer>
    </SHeader>
  );
};

export default Header;
