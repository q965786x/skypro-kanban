import styled from "styled-components";

export const SSignInWrapper = styled.div`
  // стили для .wrapper
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #eaeef6;
`;

export const SContainerSignIn = styled.div`
  // стили для .container-signin
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
`;

export const SModal = styled.div`
  // стили для .modal
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SModalBlock = styled.div`
  //стили для .modal__block
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  overflow: hidden;
`;

export const SModalTtl = styled.div`
  //стили для .modal__ttl h2
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
`;

export const SInputWrapper = styled.div`
  //стили для .input-wrapper
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #555;
  }
`;

export const BaseButton = styled.button`
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  height: 30px;
  background-color: ${(props) => 
    props.$isDisabled ? "#94A6BE" : "#565EEF"};
  padding: 12px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
  cursor: ${(props) => 
    props.$isDisabled ? "not-allowed" : "pointer"};
  transition: background-color 0.3s ease;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: ${(props) => 
      props.$isDisabled ? "#94A6BE" : "#33399b"};
  }
`;

export const SFormLink = styled.div`
  // стили для .form-group
  text-align: center;
  color: #94a6be;
  font-weight: 400;
  font-size: 14px;
  font-family: inherit;

  a {
    color: #94a6be;
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    font-family: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SErrorText = styled.p`
  color: #F84D4D;
  text-align: center;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 400;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
