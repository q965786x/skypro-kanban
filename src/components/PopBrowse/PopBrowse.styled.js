import styled from "styled-components";

export const SPopBrowse = styled.div`
  //стили для .pop-browse
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: block;
  overflow: auto;
  padding-top: 94px;

  /* Модалка не должна перекрывать Header */
  pointer-events: none;

  & > * {
    pointer-events: auto; /* Но контент модалки кликабелен */
  }

  @media screen and (max-width: 495px) {
    top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    min-height: calc(100vh - 60px);
    padding-top: 0;
    background: ${(props) =>
      props.theme.mode === "dark" ? "#151419" : props.theme.colors.background};
  }
`;

export const SPopBrowseContainer = styled.div`
  //стили для .pop-browse__container
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 94px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 495px) {
    padding: 0;
    min-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
    margin-top: 0;
  }
`;

export const SPopBrowseBlock = styled.div`
  //стили для .pop-browse__block
  display: block;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.surface};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${(props) => props.theme.colors.border};
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.medium};
  max-height: calc(100vh - 140px);
  overflow-y: auto;

  @media screen and (max-width: 495px) {
    margin: 0 auto;
    border-radius: 10px;
    min-height: auto;
    padding: 20px 16px;
    box-shadow: ${(props) => props.theme.shadows.medium};
    max-width: 100%;
    border: 0.7px solid ${(props) => props.theme.colors.border};
    display: block;
    max-height: calc(100vh - 80px);
  }
`;

export const SPopBrowseContent = styled.div`
  //стили для .pop-browse__content
  display: block;
  text-align: left;

  @media screen and (max-width: 495px) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const SPopBrowseTopBlock = styled.div`
  //стили для .pop-browse__top-block
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  @media screen and (max-width: 495px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

export const SPopBrowseTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  outline: none;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background: ${(props) =>
    props.disabled
      ? props.theme.colors.background
      : props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(86, 94, 239, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
    font-weight: 400;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SPopBrowseTtl = styled.h3`
  //стили для .pop-browse__ttl
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    font-size: 18px;
    margin-bottom: 15px;
    text-align: center;
    padding: 0 16px;
  }
`;

export const SPopBrowseWrap = styled.div`
  //стили для .pop-browse__wrap
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: 495px) {
    display: block;
    padding: 0;
  }
`;

export const SPopBrowseForm = styled.form`
  //стили для .pop-browse__form
  width: 100%;
  display: block;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

export const SFormBrowseBlock = styled.div`
  //стили для .form-browse__block
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    margin-bottom: 15px;
  }
`;

export const SFormBrowseArea = styled.textarea`
  //стили для .form-browse__area
  width: 100%;
  max-width: 370px;
  height: 200px;
  outline: none;
  padding: 15px;
  background: ${(props) => props.theme.colors.background};
  border: 0.7px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  resize: vertical;
  font-family: inherit;
  text-align: left;
  color: ${(props) => props.theme.colors.text};
  transition: border-color 0.3s ease;

  @media screen and (max-width: 495px) {
    width: 343px;
    height: 37px;
    line-height: 1;
    letter-spacing: -0.14px;
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.background};
    cursor: not-allowed;
  }
`;

export const SPopBrowseStatus = styled.div`
  //стили для .pop-browse__status
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SStatusTitle = styled.p`
  //стили для .status__p
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
  align-items: left;
`;

export const SStatusThemes = styled.div`
  //стили для .status__themes
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
`;

export const SStatusTheme = styled.div`
  //стили для .status__theme
  border-radius: 24px;
  border: 0.7px solid ${(props) => props.theme.colors.border};
  color: ${(props) =>
    props.$active ? "#FFFFFF" : props.theme.colors.textSecondary};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.textSecondary : "transparent"};
  padding: 11px 14px 10px;
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.$active ? 1 : 0.7)};
  }
`;

export const SStatusThemeText = styled.p`
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin: 0;
  color: inherit;
`;

export const SPopBrowseBtnBrowse = styled.div`
  //стили для .pop-browse__btn-browse
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;

  @media screen and (max-width: 495px) {
    flex-direction: column;
    width: 373px;
    gap: 10px;
    padding: 0;
  }
`;

export const SPopBrowseBtnEdit = styled.div`
  //стили для .pop-browse__btn-edit
  display: ${(props) => (props.$hide ? "none" : "flex")};
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;

  @media screen and (max-width: 495px) {
    flex-direction: column;
    width: 373px;
    gap: 10px;
    padding: 0;
  }
`;

export const SBtnGroup = styled.div`
  //стили для .btn-group
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;

  @media screen and (max-width: 495px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }
`;

export const SBtnEdit = styled.button`
  //стили для .btn-edit
  width: auto;
  height: 30px;
  padding: 0 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  white-space: nowrap;

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
    margin-bottom: 0;
  }

  &.btn-bg {
    background: ${(props) => props.theme.colors.primary};
    color: #ffffff;

    &:hover {
      background: ${(props) => props.theme.colors.primaryHover};
    }

    a {
      color: #ffffff;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }

  &.btn-bor {
    background: transparent;
    border: 0.7px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      color: #ffffff;

      a {
        color: #ffffff;
      }
    }

    a {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }

  &.btn-delete {
    background: transparent;
    border: 0.7px solid ${(props) => props.theme.colors.error};
    color: ${(props) => props.theme.colors.error};

    &:hover {
      background: ${(props) => props.theme.colors.error};
      color: #ffffff;

      a {
        color: #ffffff;
      }
    }

    a {
      color: ${(props) => props.theme.colors.error};
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SBtnClose = styled.button`
  width: auto;
  min-width: 100px;
  height: 30px;
  padding: 0 20px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }

  &:hover {
    background: ${(props) => props.theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SCategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 40px;
  padding: 8px 20px;
  border-radius: 24px;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &._active-category {
    opacity: 1 !important;
  }

  &:hover {
    opacity: 0.7;
  }

  &._orange {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#4a2c00" : "#ffe4c2"};

    p._orange {
      color: ${(props) =>
        props.theme.mode === "dark" ? "#ffb347" : "#ff6d00"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }

  &._green {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#004d2a" : "#b4fdd1"};

    p._green {
      color: ${(props) =>
        props.theme.mode === "dark" ? "#00e676" : "#06b16e"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }

  &._purple {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#3a1d66" : "#e9d4ff"};

    p._purple {
      color: ${(props) =>
        props.theme.mode === "dark" ? "#bb86fc" : "#9a48f1"};
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }

  @media screen and (max-width: 495px) {
    height: 30px;
    padding: 8px 20px;
    min-width: 100px;
    font-size: 14px;
  }
`;
