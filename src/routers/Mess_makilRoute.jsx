import { Navigate, Outlet } from "react-router-dom";

const Mess_malikRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "mess_malik") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Mess_malikRoute;