import { createContext } from "react";

export const TasksContext = createContext({
  tasks: [],
  isLoading: false,
  error: "",
  isOfflineMode: false,
  addNewTask: () => {},
  updateTask: () => {},
  removeTask: () => {},
  refetchTasks: () => {},
  clearError: () => {},
  updateTaskStatus: () => {}, 
});
