import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../services/auth";
import BaseInput from "./Input";
import { AuthContext } from "../context/AuthContext";
import {
  SSignInWrapper,
  SContainerSignIn,
  SModal,
  SModalBlock,
  SModalTtl,
  SInputWrapper,
  BaseButton,
  SFormLink,
} from "./AuthForm.styled";

const AuthForm = ({ isSignUp }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });

  const [error, setError] = useState("");

  const validateForm = () => {
    const newErrors = { name: false, login: false, password: false };
    let isValid = true;

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setError("Заполните все поля");
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = isSignUp
        ? await signUp(formData)
        : await signIn({ login: formData.login, password: formData.password });

      if (data) {
        console.log("AuthForm: успешная авторизация, данные:", data);
        login(data);
        console.log("AuthForm: переход на главную страницу");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
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
                    error={errors.name}
                    type="text"
                    name="name"
                    id="formname"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                <BaseInput
                  error={errors.login}
                  type="text"
                  name="login"
                  id="formlogin"
                  placeholder="Логин"
                  value={formData.login}
                  onChange={handleChange}
                />
                <BaseInput
                  error={errors.password}
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                />
              </SInputWrapper>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}

              <BaseButton type="submit" $fullWidth={true}>
                {isSignUp ? "Зарегистрироваться" : "Войти"}
              </BaseButton>

              {!isSignUp ? (
                <SFormLink>
                  <p>Нужно зарегистрироваться?</p>
                  <Link to="/sign-up">Регистрируйтесь здесь</Link>
                </SFormLink>
              ) : (
                <SFormLink>
                  <p>
                    Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link>
                  </p>
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
