import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PopUser from "../PopUser/PopUser";
import { AuthContext } from "../../context/AuthContext";
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
              <Link to="card/new">Создать новую задачу</Link>
            </SHeaderButton>
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
