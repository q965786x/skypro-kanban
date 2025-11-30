import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
  try {
    console.log("Отправка данных для входа:", { login: userData.login });

    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "",
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Ошибка входа:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Неверный логин или пароль";
    throw new Error(errorMessage);
  }
}

export async function signUp(userData) {
  try {
    console.log("Отправляем данные для регистрации:", userData);

    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "",
      },
    });

    console.log("Успешная регистрация:", response.data);
    return response.data.user;
  } catch (error) {
    console.error("Ошибка регистрации:", error.response?.data);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Ошибка при регистрации";
    throw new Error(errorMessage);
  }
}
