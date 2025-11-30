export const checkLs = () => {
  try {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Базовая проверка структуры
      if (userData && typeof userData === "object" && userData.token) {
        return userData;
      }
    }
    return null;
  } catch (error) {
    console.error("Ошибка при загрузке данных из localStorage:", error);
    return null;
  }
};
