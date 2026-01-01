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
    async (id, task) => {
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
        const updatedTasks = await editTask({
          token: user?.token,
          id,
          task: {
            ...task,
            title: task.title.trim(),
            description: task.description.trim(),
          },
        });
        setTasks(updatedTasks || []);
        return true;
      } catch (error) {
        setError(error.message || "Ошибка редактирования задачи");
        return false;
      }
    },
    [user?.token]
  );

  const removeTask = useCallback(
    async (id) => {
      if (!user?.token) {
        setError("Требуется авторизация");
        return false;
      }

      try {
        const updatedTasks = await deleteTask({ token: user?.token, id });
        setTasks(updatedTasks || []);
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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TaskProvider;
