import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MobileButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 343px;
  z-index: 999;

  @media screen and (max-width: 375px) {
    width: calc(100% - 30px);
    max-width: 343px;
  }

  @media screen and (min-width: 496px) {
    display: none;
  }

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) =>
    props.$visible
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(20px)"};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;

const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: #565eef;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(86, 94, 239, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #454cd6;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(86, 94, 239, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MobileCreateButton = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const mobile = window.innerWidth <= 495;
      setIsMobile(mobile);

      if (mobile) {
        const pathname = window.location.pathname;
        const hasModalOpen = document.body.classList.contains("modal-open");
        const isOnCreatePage = pathname.includes("/card/new");
        const isOnMainPage = pathname === "/";

        const shouldBeVisible =
          isOnMainPage && !hasModalOpen && !isOnCreatePage;
        setIsVisible(shouldBeVisible);
      } else {
        setIsVisible(false);
      }
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("popstate", updateVisibility);
    window.addEventListener("hashchange", updateVisibility);

    const interval = setInterval(updateVisibility, 500);

    return () => {
      window.removeEventListener("resize", updateVisibility);
      window.removeEventListener("popstate", updateVisibility);
      window.removeEventListener("hashchange", updateVisibility);
      clearInterval(interval);
    };
  }, []);

  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <MobileButtonWrapper $visible={isVisible}>
      <StyledButton to="/card/new">Создать новую задачу</StyledButton>
    </MobileButtonWrapper>
  );
};

export default MobileCreateButton;
