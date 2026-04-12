/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

// create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
