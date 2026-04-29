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

import DailyBalance from "../features/balance/pages/DailyBalance";
import BasaVaraRate from "../features/basavara/pages/BasaVaraRate";
import MonthlyBasaVara from "../features/basavara/pages/MonthlyBasaVara";
import MonthlyCurrentBill from "../features/bills/pages/MonthlyCurrentBill";
import DailayEggIncidantal from "../features/incidentalExpenses/pages/DailayEggIncidantal";
import MonthlyKhalaBill from "../features/khalaBill/pages/MonthlyKhalaBill";
import DailyMeals from "../features/mill/pages/DailyMeals";
import MainLayout from "../layouts/MainLayout";
import CurrentBillCreate from "../pages/admin/CurrentBillCreate";
import EggRate from "../pages/admin/EggRate";
import KhalaBillCreate from "../pages/admin/KhalaBillCreate";
import BasaVara from "../pages/masMalik/BasaVara";
// route
import SetPassword from "../pages/auth/SetPassword";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/*  Public Routes */}
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/set-password/:token" element={<SetPassword />} />
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/*  Protected Routes (All logged-in users) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/create-users" element={<CreateUser />} />
          <Route path="/get-users" element={<UserList />} />

          <Route path="/basa-vara" element={<BasaVara />} />
          <Route path="/basa-vara-rate" element={<BasaVaraRate />} />
          <Route path="/montly-basaVara/:id" element={<MonthlyBasaVara />} />

          <Route path="/cost" element={<CostAdd />} />
          <Route path="/incidental-cost" element={<IncidentalExpenses />} />

          <Route path="/create-balance" element={<CreateBalance />} />
          <Route path="/balance/:id" element={<DailyBalance />} />

          <Route path="/current-bill" element={<CurrentBillCreate />} />
          <Route path="/currentBill/:id" element={<MonthlyCurrentBill />} />

          <Route path="/khala-bill" element={<KhalaBillCreate />} />
          <Route path="/khalaBill/:id" element={<MonthlyKhalaBill />} />

          <Route path="/mills" element={<MillUpdate />} />
          <Route path="/mill/:id" element={<DailyMeals />} />

          {/*  Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route
              path="/make-sub-admin"
              element={<Make_subAdminMess_malik />}
            />
            <Route path="/egg-rate" element={<EggRate />} />
            <Route path="/egg/:id" element={<DailayEggIncidantal />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      {/*  Error Route */}
      <Route path="*" element={<Errors />} />
    </Routes>
  );
};

export default AppRoutes;
