import styled from "styled-components";

export const SPopBrowse = styled.div`
  //стили для .pop-browse
  display: none;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`;

export const SPopBrowseContainer = styled.div`
  //стили для .pop-browse__container
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const SPopBrowseBlock = styled.div`
  //стили для .pop-browse__block
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
`;

export const SPopBrowseContent = styled.div`
  //стили для .pop-browse__content
  display: block;
  text-align: left;
`;

export const SPopBrowseTopBlock = styled.div`
  //стили для .pop-browse__top-block
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SPopBrowseTtl = styled.h3`
  //стили для .pop-browse__ttl
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const SPopBrowseWrap = styled.div`
  //стили для .pop-browse__wrap
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SPopBrowseStatus = styled.div`
  //стили для .pop-browse__status
  margin-bottom: 11px;
`;

export const SStatusTitle = styled.p`
  //стили для .status__p
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const SStatusThemes = styled.div`
  //стили для .status__themes
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SStatusTheme = styled.div`
  //стили для .status__theme
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: ${(props) => (props.$active ? "#FFFFFF" : "#94A6BE")};
  background-color: ${(props) => (props.$active ? "#94A6BE" : "transparent")};
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.$active ? 1 : 0.7)};
  }

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    margin: 0;
    color: inherit;
  }
`;

export const SStatusThemeText = styled.p`
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin: 0;
  color: inherit;
`;

export const SPopBrowseForm = styled.form`
  //стили для .pop-browse__form
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

export const SFormBrowseBlock = styled.div`
  //стили для .form-browse__block
  display: flex;
  flex-direction: column;
`;

export const SFormBrowseArea = styled.textarea`
  //стили для .form-browse__area
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;

  &::-moz-placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }
`;

export const SPopBrowseBtnBrowse = styled.div`
  //стили для .pop-browse__btn-browse
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SPopBrowseBtnEdit = styled.div`
  //стили для .pop-browse__btn-edit
  display: ${(props) => (props.$hide ? "none" : "flex")};
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SBtnGroup = styled.div`
  //стили для .btn-group
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

export const SBtnEdit = styled.button`
  //стили для .btn-edit
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;

  &.btn-bg {
    background: #565eef;
    color: #ffffff;

    &:hover {
      background: #33399b;
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
    border: 0.7px solid #565eef;
    color: #565eef;

    &:hover {
      background: #565eef;
      color: #ffffff;

      a {
        color: #ffffff;
      }
    }

    a {
      color: #565eef;
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
    border: 0.7px solid #ff4444;
    color: #ff4444;

    &:hover {
      background: #ff4444;
      color: #ffffff;

      a {
        color: #ffffff;
      }
    }

    a {
      color: #ff4444;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }
`;

export const SBtnClose = styled.button`
  height: 30px;
  padding: 0 14px;
  border-radius: 4px;
  background: #565eef;
  color: #ffffff;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #33399b;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;

export const SCategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
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
    background-color: #ffe4c2;

    p._orange {
      color: #ff6d00;
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }

  &._green {
    background-color: #b4fdd1;

    p._green {
      color: #06b16e;
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }

  &._purple {
    background-color: #e9d4ff;

    p._purple {
      color: #9a48f1;
      font-size: 14px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
      margin: 0;
    }
  }
`;

export const SPopBrowseTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid #d4dbe5;
  border-radius: 4px;
  outline: none;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background: ${(props) => (props.disabled ? "#f5f5f5" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #565eef;
    box-shadow: 0 0 0 2px rgba(86, 94, 239, 0.2);
  }

  &::placeholder {
    color: #94a6be;
    font-weight: 400;
  }
`;
