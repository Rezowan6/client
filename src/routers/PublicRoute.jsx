import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log(error);
    console.log("Invalid user JSON");
    localStorage.removeItem("user");
  }

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
