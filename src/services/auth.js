import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "",
      },
    });

    return response.data.user;
  } catch (error) {
    throw new Error("Неверный логин или пароль");
  }
}

export async function signUp(userData) {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "",
      },
    });

    return response.data.user;
  } catch (error) {
    let errorMessage = "Ошибка при регистрации";

    if (error.response?.status === 400) {
      errorMessage = "Некорректные данные";
    } else if (error.response?.status === 409) {
      errorMessage = "Пользователь с таким email уже существует";
    } else if (error.response?.status === 500) {
      errorMessage = "Ошибка сервера. Попробуйте позже.";
    }

    throw new Error(errorMessage);
  }
}
