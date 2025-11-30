import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { fetchTasks, postTask, editTask, deleteTask } from "../services/api";
import { AuthContext } from "./AuthContext";
import { TasksContext } from "./TaskContext";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // useRef для отслеживания текущих запросов
  const isFetchingRef = useRef(false);
  const isCreatingRef = useRef(false);

  // useCallback с правильными зависимостями
  const loadTasks = useCallback(async () => {
    // Защита от двойных вызовов
    if (isFetchingRef.current) {
      console.log("Загрузка задач уже выполняется, пропускаем");
      return;
    }

    if (!user?.token) {
      console.log("Нет токена, очищаем задачи");
      setTasks([]);
      setIsLoading(false);
      return;
    }

    isFetchingRef.current = true;

    try {
      setIsLoading(true);
      setError("");
      console.log("Загрузка задач для пользователя:", user.login);
      const data = await fetchTasks({ token: user.token });
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Ошибка загрузки задач", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [user?.token, user?.login]); // Только необходимые зависимости

  useEffect(() => {
    console.log("TaskProvider: эффект сработал, пользователь:", user?.login);
    // Добавляем небольшую задержку для стабильности
    const timer = setTimeout(() => {
      loadTasks();
    }, 100);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  // useCallback для addNewTask чтобы предотвратить двойные вызовы
  const addNewTask = useCallback(
    async (task) => {
      if (isCreatingRef.current) {
        console.log("Создание задачи уже выполняется, пропускаем");
        return false;
      }

      if (!user?.token) {
        console.error("Нет токена для создания задачи");
        return false;
      }

      isCreatingRef.current = true;

      try {
        console.log("Создание задачи:", {
          title: task.title,
          topic: task.topic,
        });
        const newTasks = await postTask({ token: user.token, task });
        setTasks(newTasks || []);
        return true;
      } catch (error) {
        console.error("Ошибка добавления задачи", error);
        setError(error.message);
        return false;
      } finally {
        isCreatingRef.current = false;
      }
    },
    [user?.token]
  );

  const updateTask = useCallback(
    async (id, task) => {
      try {
        const updatedTasks = await editTask({ token: user?.token, id, task });
        setTasks(updatedTasks || []);
        return true;
      } catch (error) {
        console.error("Ошибка редактирования задачи", error);
        setError(error.message);
        return false;
      }
    },
    [user?.token]
  );

  const removeTask = useCallback(
    async (id) => {
      try {
        const updatedTasks = await deleteTask({ token: user?.token, id });
        setTasks(updatedTasks || []);
        return true;
      } catch (error) {
        console.error("Ошибка удаления задачи", error);
        setError(error.message);
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
        addNewTask,
        updateTask,
        removeTask,
        refetchTasks: loadTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TaskProvider;
