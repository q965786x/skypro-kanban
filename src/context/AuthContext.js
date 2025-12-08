import { createContext } from "react";

{/* export const AuthContext = createContext(null); */} // Создали контекст

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateUserInfo: () => {},
  isCheckingAuth: true,
});
