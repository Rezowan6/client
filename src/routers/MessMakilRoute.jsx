import { Navigate, Outlet } from "react-router-dom";

const MessMalikRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "messMalik") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default MessMalikRoute;