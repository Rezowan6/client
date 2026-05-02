import { Navigate, Outlet } from "react-router-dom";

const AdminSubAdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin" || user?.role !== 'subAdmin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminSubAdminRoute;