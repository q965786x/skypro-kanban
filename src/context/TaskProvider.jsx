{/* import React, {
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

  useEffect(() => {
    console.log("TaskProvider: эффект сработал, пользователь:", user?.login);

    const loadTask = async () => {
      if (!user?.token) {
        console.log("TaskProvider: нет токена");
        setTasks([]);
        return;
      }

      try {
        setIsLoading(true);
        console.log("TaskProvider: запрос задач...");
        const data = await fetchTasks({ token: user.token });
        console.log("TaskProvider: полученные данные:", data);
        console.log("TaskProvider: массив задач:", data.tasks);
        console.log("TaskProvider: тип данных:", typeof data.tasks);
        console.log("TaskProvider: количество задач:", data.tasks?.length);

        if (data && data.tasks) {
          setTasks(data.tasks);
          console.log("TaskProvider: задачи установлены в состояние");
        } else {
          console.warn("TaskProvider: нет данных задач");
          setTasks([]);
        }
      } catch (error) {
        console.error("TaskProvider: ошибка:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [user?.token, user?.login]);

  const addNewTask = useCallback(
    async (task) => {
      console.log("addNewTask вызван с задачей:", task);

      if (!user?.token) {
        console.error("Нет токена пользователя");
        return false;
      }

      try {
        console.log("Отправка задачи на сервер...");
        const response = await postTask({ token: user.token, task });
        console.log("Ответ от сервера после создания:", response);

        // ВАЖНО: response содержит {tasks: [...]}
        if (response && Array.isArray(response.tasks)) {
          setTasks(response.tasks); // Обновляем весь список
          console.log(
            "Список задач обновлен, количество:",
            response.tasks.length
          );
          return true; // Успех
        } else {
          console.error("Некорректный формат ответа:", response);
          return false; // Ошибка
        }
      } catch (error) {
        console.error("Ошибка в addNewTask:", error.message);
        setError(error.message);
        return false; // Ошибка
      }
    },
    [user?.token, setTasks, setError]
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

export default TaskProvider; */}

import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchTasks, postTask, editTask, deleteTask } from "../services/api";
import { AuthContext } from "./AuthContext";
import { TasksContext } from "./TaskContext";

// Экспортируем провайдер как дефолтный
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // Загрузка задач
  const loadTasks = useCallback(async () => {
    if (!user?.token) {
      console.log("Нет токена, очищаем задачи");
      setTasks([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      console.log("Загрузка задач для пользователя:", user.login);
      const data = await fetchTasks({ token: user.token });
      console.log("Получены данные от сервера:", data);
      
      if (data && data.tasks) {
        setTasks(data.tasks);
        console.log("Задачи успешно загружены:", data.tasks.length, "шт");
      } else {
        console.warn("Сервер не вернул задачи:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки задач", error);
      setError(error.message || "Ошибка загрузки задач");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.token, user?.login]);

  useEffect(() => {
    console.log("TaskProvider: эффект сработал, пользователь:", user?.login);
    loadTasks();
  }, [loadTasks]);

  // Создание задачи
  const addNewTask = useCallback(
    async (task) => {
      console.log("addNewTask вызван с задачей:", task);
      
      if (!user?.token) {
        console.error("Нет токена пользователя");
        return false;
      }

      try {
        console.log("Отправка задачи на сервер...");
        const response = await postTask({ token: user.token, task });
        console.log("Ответ от сервера после создания:", response);
        
        if (response && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
          console.log("Список задач обновлен, количество:", response.tasks.length);
          return true;
        } else {
          console.error("Некорректный формат ответа:", response);
          return false;
        }
      } catch (error) {
        console.error("Ошибка в addNewTask:", error.message);
        setError(error.message);
        return false;
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

// ВАЖНО: Добавляем дефолтный экспорт
export default TaskProvider;

// Можно также оставить именованный экспорт если нужно
export { TaskProvider };