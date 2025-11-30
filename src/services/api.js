import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

export async function fetchTasks({ token }) {
  try {
    console.log("Загрузка задач...");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Задачи успешно загружены:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Ошибка загрузки задач:",
      error.response?.status,
      error.response?.data
    );

    if (error.response?.status === 401) {
      throw new Error("Неверный токен авторизации. Пожалуйста, войдите снова.");
    }

    throw new Error(
      error.response?.data?.error || error.message || "Ошибка загрузки задач"
    );
  }
}

export async function postTask({ token, task }) {
  try {
    console.log("Создание задачи:", {
      title: task.title,
      topic: task.topic,
    });

    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    console.log("Задача успешно создана:", response.data);

    return response.data.tasks;
  } catch (error) {
    console.error("Ошибка создания задачи:", error.response?.data);
    throw new Error(
      error.response?.data?.error || error.message || "Ошибка создания задачи"
    );
  }
}

export async function getTask({ token, id }) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка получения задачи:", error.response?.data);
    throw new Error(
      error.response?.data?.error || error.message || "Ошибка получения задачи"
    );
  }
}

export async function editTask({ token, id, task }) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return response.data.tasks;
  } catch (error) {
    console.error("Ошибка редактирования задачи:", error.response?.data);
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Ошибка редактирования задачи"
    );
  }
}

export async function deleteTask({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tasks;
  } catch (error) {
    console.error("Ошибка удаления задачи:", error.response?.data);
    throw new Error(
      error.response?.data?.error || error.message || "Ошибка удаления задачи"
    );
  }
}
