/* eslint-disable react-refresh/only-export-components */

// create context
import { createContext, useContext, } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
