import styled from "styled-components";

export const SHeader = styled.header`
  // стили для .header
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const SContainer = styled.div`
  // стили для .container
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
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
`;

export const SHeaderLogo = styled.div`
  // стили для .header__logo
  width: 85px;
`;

export const SHeaderNav = styled.nav`
  // стили для .header__nav
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #565eef;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #33399b;
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
    transition: border-color 0.3s ease;
  }

  &:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }
`;

export const SHeaderButton = styled.button`
  // стили для .header__btn-main-new
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
`;
