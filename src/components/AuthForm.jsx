import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SSignInWrapper,
  SContainerSignIn,
  SModal,
  SModalBlock,
  SModalTtl,
  SInputWrapper,
  BaseInput,
  BaseButton,
  SFormLink,
} from "./AuthForm.styled";

const AuthForm = ({ isSignUp, onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/");
  };

  return (
    <SSignInWrapper>
      <SContainerSignIn>
        <SModal>
          <SModalBlock>
            <SModalTtl>{isSignUp ? "Регистрация" : "Вход"}</SModalTtl>
            <form onSubmit={handleSubmit}>
              <SInputWrapper>
                {isSignUp && (
                  <BaseInput
                    type="text"
                    name="name"
                    id="formname"
                    placeholder="Имя"
                    required
                  />
                )}
                <BaseInput
                  type="email"
                  name="login"
                  id="formlogin"
                  placeholder="Эл. почта"
                  required
                />
                <BaseInput
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  required
                />
              </SInputWrapper>

              <BaseButton type="submit">
                {isSignUp ? "Зарегистрироваться" : "Войти"}
              </BaseButton>

              {!isSignUp ? (
                <SFormLink>
                  <p>Нужно зарегистрироваться?</p>
                  <Link to="/sign-up">Регистрируйтесь здесь</Link>
                </SFormLink>
              ) : (
                <SFormLink>
                  <p>Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link></p>                  
                </SFormLink>
              )}
            </form>
          </SModalBlock>
        </SModal>
      </SContainerSignIn>
    </SSignInWrapper>
  );
};

export default AuthForm;
