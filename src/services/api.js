import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

const handleApiError = (error) => {
  console.error("API Error:", error.response?.status, error.response?.data);
  
  if (error.response?.status === 401) {
    throw new Error("Сессия истекла. Пожалуйста, войдите снова.");
  }
  
  if (error.response?.status === 400) {
    throw new Error(error.response?.data?.error || "Некорректные данные");
  }
  
  if (error.response?.status === 404) {
    throw new Error("Ресурс не найден");
  }
  
  if (error.response?.status === 500) {
    throw new Error("Ошибка сервера. Попробуйте позже.");
  }
  
  if (!error.response) {
    throw new Error("Нет соединения с сервером. Проверьте интернет-соединение.");
  }
  
  throw new Error(error.response?.data?.error || error.message || "Произошла ошибка");
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
    handleApiError(error);    
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
    return response.data.tasks;
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
    return response.data.tasks;
  } catch (error) {
    handleApiError(error);
  }
}
