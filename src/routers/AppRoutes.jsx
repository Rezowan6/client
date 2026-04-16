
import { Route, Routes } from "react-router-dom";

// pages
import Login from "../pages/auth/Login";
import UserDashboard from './../pages/dashboard/UserDashboard';
import Errors from "../pages/errors/Errors";
import Home from "../pages/public/Home";
import Register from './../pages/auth/Register';
import VerifyEmail from "../pages/auth/VerifyEmail";
import CreateUser from "../pages/admin/CreateUser";
import UserList from "../pages/admin/UserList";
import CreateBalance from "../pages/admin/CreateBalance";
import MillUpdate from "../pages/admin/MillUpdate";
import CostAdd from "../pages/admin/CostAdd";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import IncidentalExpenses from "../pages/admin/IncidentalExpenses";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-users" element={<CreateUser />} />
      <Route path="/get-users" element={<UserList />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/mills" element={<MillUpdate />} />
      <Route path="/create-balance" element={<CreateBalance />} />
      <Route path="/cost" element={<CostAdd />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/incidental-cost" element={<IncidentalExpenses />} />
      <Route path="*" element={<Errors />} />
    </Routes>
  );
};

export default AppRoutes;
