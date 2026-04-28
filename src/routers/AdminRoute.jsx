import { Navigate, Outlet } from "react-router-dom";

import { getLocalUser } from "../utils/localStorage/localStorage";

const AdminRoute = () => {
  const user = getLocalUser();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
