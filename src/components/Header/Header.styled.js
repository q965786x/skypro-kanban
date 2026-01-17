import styled from "styled-components";

export const SHeader = styled.header`
  // стили для .header
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#1E1E1E" : props.theme.colors.surface};
  padding: 12px 0;
  box-shadow: ${(props) => props.theme.shadows.small};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: ${(props) =>
    props.theme.mode === "dark" ? "1px solid #2D2D2D" : "none"};
`;

export const SContainer = styled.div`
  // стили для .container
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media screen and (max-width: 495px) {
    padding: 0 16px;
  }

  @media screen and (max-width: 375px) {
    padding: 0 12px;
  }
`;

export const SHeaderBlock = styled.div`
  // стили для .header__block
  position: relative !important;
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;

  @media screen and (max-width: 495px) {
    height: 60px;
    padding: 0 5px;
  }

  @media screen and (max-width: 375px) {
    height: 55px;
  }
`;

export const SHeaderLogo = styled.div`
  // стили для .header__logo
  width: 85px;

  @media screen and (max-width: 495px) {
    width: 75px;
  }

  @media screen and (max-width: 375px) {
    width: 70px;
  }
`;

export const SHeaderNav = styled.nav`
  // стили для .header__nav
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 495px) {
    max-width: 200px;
  }
`;

export const SHeaderUser = styled.div`
  // стили для .header__user
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: color 0.3s ease;

  @media screen and (max-width: 495px) {
    font-size: 13px;
  }

  @media screen and (max-width: 375px) {
    font-size: 12px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${(props) => props.theme.colors.primary};
    border-bottom: 1.9px solid ${(props) => props.theme.colors.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
    transition: border-color 0.3s ease;

    @media screen and (max-width: 495px) {
      width: 5px;
      height: 5px;
    }
  }

  &:hover::after {
    border-left-color: ${(props) => props.theme.colors.primaryHover};
    border-bottom-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

export const SHeaderButton = styled.button`
  // стили для .header__btn-main-new
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(86, 94, 239, 0.3);
  }

  a {
    color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 495px) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;

    a {
      font-size: 0;
    }

    &::before {
      content: "+";
      font-size: 24px;
      font-weight: 500;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media screen and (max-width: 375px) {
    width: 36px;
    height: 36px;
  }
`;
