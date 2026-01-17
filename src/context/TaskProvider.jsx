import React, { useContext, useState, useEffect, useCallback } from "react";
import { fetchTasks, postTask, editTask, deleteTask } from "../services/api";
import { AuthContext } from "./AuthContext";
import { TasksContext } from "./TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const { user } = useContext(AuthContext);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId || task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }, []);

  const loadTasks = useCallback(async () => {
    if (!user?.token) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await fetchTasks({ token: user.token });

      if (data && data.tasks) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
      setIsOfflineMode(false);
    } catch (error) {
      setError("Ошибка загрузки задач. Проверьте соединение с интернетом.");
      setIsOfflineMode(true);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addNewTask = useCallback(
    async (task) => {
      if (!user?.token) {
        setError("Требуется авторизация");
        return false;
      }

      if (!task.title || !task.title.trim()) {
        setError("Название задачи не может быть пустым");
        return false;
      }

      if (!task.description || !task.description.trim()) {
        setError("Описание задачи не может быть пустым");
        return false;
      }

      try {
        const response = await postTask({
          token: user.token,
          task: {
            ...task,
            title: task.title.trim(),
            description: task.description.trim(),
          },
        });

        if (response && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
          return true;
        }
        return false;
      } catch (error) {
        setError(error.message || "Ошибка создания задачи");
        return false;
      }
    },
    [user?.token]
  );

  const updateTask = useCallback(
    async (id, taskData) => {
      if (!user?.token) {
        setError("Требуется авторизация");
        return false;
      }

      if (!taskData.title || !taskData.title.trim()) {
        setError("Название задачи не может быть пустым");
        return false;
      }

      if (!taskData.description || !taskData.description.trim()) {
        setError("Описание задачи не может быть пустым");
        return false;
      }

      try {
        setTasks((prevTasks) => {
          return prevTasks.map((task) =>
            task._id === id || task.id === id
              ? {
                  ...task,
                  ...taskData,
                  title: taskData.title.trim(),
                  description: taskData.description.trim(),
                }
              : task
          );
        });

        const response = await editTask({
          token: user?.token,
          id,
          task: {
            ...taskData,
            title: taskData.title.trim(),
            description: taskData.description.trim(),
          },
        });

        if (response?.tasks && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
        }

        return true;
      } catch (error) {
        await loadTasks();
        throw error;
      }
    },
    [user?.token, loadTasks]
  );

  const removeTask = useCallback(
    async (id) => {
      if (!user?.token) {
        setError("Требуется авторизация");
        return false;
      }

      try {
        const response = await deleteTask({ token: user?.token, id });

        if (response && response.tasks && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
        } else {
          setTasks([]);
        }
        return true;
      } catch (error) {
        setError(error.message || "Ошибка удаления задачи");
        return false;
      }
    },
    [user?.token]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        isOfflineMode,
        addNewTask,
        updateTask,
        removeTask,
        refetchTasks: loadTasks,
        clearError: () => setError(""),
        updateTaskStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TaskProvider;
