// import { createContext, useContext, useEffect, useState } from "react";
// import { getProfile, loginUser, logoutUser } from "../services/authService";

// import toast from "react-hot-toast";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // check logged in user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const data = await getProfile();

//         setUser(data.user);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // login
//   const login = async (formData) => {
//     try {
//       const data = await loginUser(formData);

//       setUser(data.user);

//       toast.success("Login successful");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   // logout
//   const logout = async () => {
//     try {
//       await logoutUser();

//       setUser(null);

//       toast.success("Logged out");
//     } catch (err) {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
