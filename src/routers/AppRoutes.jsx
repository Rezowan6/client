import { Route, Routes } from "react-router-dom";

// pages
import CostAdd from "../pages/admin/CostAdd";
import CreateBalance from "../pages/admin/CreateBalance";
import CreateUser from "../pages/admin/CreateUser";
import IncidentalExpenses from "../pages/admin/IncidentalExpenses";
import Make_subAdminMess_malik from "../pages/admin/Make_subAdminMess_malik";
import MillUpdate from "../pages/admin/MillUpdate";
import UserList from "../pages/admin/UserList";
import Login from "../pages/auth/Login";
import VerifyEmail from "../pages/auth/VerifyEmail";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Errors from "../pages/errors/Errors";
import Home from "../pages/public/Home";
import Register from "./../pages/auth/Register";
import UserDashboard from "./../pages/dashboard/UserDashboard";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/*  Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      {/*  Protected Routes (All logged-in users) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-users" element={<CreateUser />} />
        <Route path="/get-users" element={<UserList />} />
        <Route path="/create-balance" element={<CreateBalance />} />
        <Route path="/cost" element={<CostAdd />} />
        <Route path="/incidental-cost" element={<IncidentalExpenses />} />

        {/*  Admin Only Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/make-sub-admin" element={<Make_subAdminMess_malik />} />
          <Route path="/mills" element={<MillUpdate />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* ❌ Error Route */}
      <Route path="*" element={<Errors />} />
    </Routes>
  );
};

export default AppRoutes;
