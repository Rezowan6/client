
import { Route, Routes } from "react-router-dom";

// pages
import Login from "../pages/auth/Login";
import UserDashboard from './../pages/dashboard/UserDashboard';
import Errors from "../pages/errors/Errors";
import Home from "../pages/public/Home";
import Register from './../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="*" element={<Errors />} />
    </Routes>
  );
};

export default AppRoutes;
