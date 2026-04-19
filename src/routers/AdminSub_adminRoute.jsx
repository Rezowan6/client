import { Navigate, Outlet } from "react-router-dom";

const AdminSub_adminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin" || user?.role !== 'sub_admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminSub_adminRoute;