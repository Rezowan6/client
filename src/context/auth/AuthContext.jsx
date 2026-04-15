/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect } from "react";

// internal import
import { useState } from "react";
import {getUsers} from "../../services/admin/adminService";

// create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let timer;

    const verify = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data?.users);
      } catch (error) {
        console.log(error);
      }
    };

    verify();

    return () => clearTimeout(timer); // cleanup
  }, []);

  return <AuthContext.Provider value={{users}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
