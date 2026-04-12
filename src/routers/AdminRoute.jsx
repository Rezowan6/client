import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user.role !== "admin") {
    console.log('sorry only allowed admin')
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;