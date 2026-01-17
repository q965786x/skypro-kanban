import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

const handleApiError = (error) => {
  if (!error.response) {
    throw new Error(
      "Нет соединения с сервером. Проверьте интернет-соединение."
    );
  }

  const { status, data } = error.response;

  if (status === 401) {
    throw new Error("Сессия истекла. Пожалуйста, войдите снова.");
  }

  if (status === 400) {
    throw new Error(data?.error || "Некорректные данные");
  }

  if (status === 404) {
    throw new Error("Ресурс не найден");
  }

  if (status === 500) {
    throw new Error("Ошибка сервера. Попробуйте позже.");
  }

  throw new Error(data?.error || error.message || "Произошла ошибка");
};

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
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
    handleApiError(error);
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
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteTask({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
