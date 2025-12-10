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
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "",
      },
    });

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
