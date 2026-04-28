import { Navigate, Outlet } from "react-router-dom";

import { getLocalUser } from "../utils/localStorage/localStorage";

const PublicRoute = () => {
  const user = getLocalUser();

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
