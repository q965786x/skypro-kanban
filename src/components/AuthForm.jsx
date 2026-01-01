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
  SErrorText,
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

  const [serverError, setServerError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Определяем, есть ли ошибка для изменения высоты формы
  const hasError = !!serverError || !!validationError;

  // Рассчитываем высоту формы динамически
  const getFormHeight = () => {
    if (isSignUp) {
      // Форма регистрации
      return hasError ? "406px" : "345px";
    } else {
      // Форма входа
      return hasError ? "390px" : "329px";
    }
  };

  const validateForm = () => {
    const newErrors = { name: false, login: false, password: false };
    let isValid = true;
    let hasEmpty = false;

    // Проверка на пустые поля
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
      hasEmpty = true;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      isValid = false;
      hasEmpty = true;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      isValid = false;
      hasEmpty = true;
    }

    setHasEmptyFields(hasEmpty);
    setErrors(newErrors);

    if (hasEmpty) {
      if (isSignUp) {
        setValidationError(
          "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме."
        );
      } else {
        setValidationError("");
      }
      return false;
    }

    // Валидация email (только для регистрации)
    if (isSignUp && !formData.login.includes("@")) {
      newErrors.login = true;
      isValid = false;
      setValidationError(
        "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку."
      );
    }

    // Валидация пароля (минимальная длина 3 символа) - только для регистрации
    if (isSignUp && formData.password.length < 3) {
      newErrors.password = true;
      isValid = false;
      setValidationError(
        "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку."
      );
    }

    setErrors(newErrors);

    if (isValid) {
      setValidationError("");
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }

    if (serverError) setServerError("");
    if (validationError) setValidationError("");
    setHasEmptyFields(false);

    // Сбрасываем disabled состояние кнопки если были ошибки
    if (isButtonDisabled && value.trim() !== "") {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsButtonDisabled(true);
      return;
    }

    setIsSubmitting(true);
    setIsButtonDisabled(true); // Делаем кнопку неактивной при отправке
    setServerError("");
    setValidationError("");

    try {
      const data = isSignUp
        ? await signUp(formData)
        : await signIn({ login: formData.login, password: formData.password });

      if (data) {
        login(data);
        navigate("/");
      }
    } catch (err) {
      // Для формы входа показываем специальное сообщение
      if (!isSignUp) {
        setServerError(
          "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа."
        );
      } else {
        // Для регистрации - общее сообщение
        setServerError(
          "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку."
        );
      }

      // Подсвечиваем все поля при серверной ошибке
      setErrors({
        name: true,
        login: true,
        password: true,
      });

      // Кнопка остается неактивной при серверной ошибке
      setIsButtonDisabled(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SSignInWrapper>
      <SContainerSignIn>
        <SModal>
          <SModalBlock style={{ 
            height: getFormHeight(),
            transition: 'height 0.3s ease'
          }}>
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
                    disabled={isSubmitting}
                  />
                )}
                <BaseInput
                  error={errors.login}
                  type="text"
                  name="login"
                  id="formlogin"
                  placeholder="Эл. почта"
                  value={formData.login}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <BaseInput
                  error={errors.password}
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </SInputWrapper>

              {/* Сообщения об ошибках */}
              {(serverError || validationError) && (
                <SErrorText>{serverError || validationError}</SErrorText>
              )}

              <BaseButton
                type="submit"
                $fullWidth={true}
                disabled={isButtonDisabled || isSubmitting}
                $isDisabled={isButtonDisabled}
              >
                {isSubmitting
                  ? "Загрузка..."
                  : isSignUp
                  ? "Зарегистрироваться"
                  : "Войти"}
              </BaseButton>

              <SFormLink>
                {!isSignUp ? (
                  <>
                    <p style={{ marginBottom: "5px" }}>
                      Нужно зарегистрироваться?{" "}
                      <Link to="/sign-up">Регистрируйтесь здесь</Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p style={{ marginBottom: "5px" }}>
                      Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link>
                    </p>
                  </>
                )}
              </SFormLink>
            </form>
          </SModalBlock>
        </SModal>
      </SContainerSignIn>
    </SSignInWrapper>
  );
};

export default AuthForm;
