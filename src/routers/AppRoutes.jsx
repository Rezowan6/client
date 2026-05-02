import { Route, Routes } from "react-router-dom";

// pages
import CostAdd from "../pages/admin/CostAdd";
import CreateBalance from "../pages/admin/CreateBalance";
import CreateUser from "../pages/admin/CreateUser";
import IncidentalExpenses from "../pages/admin/IncidentalExpenses";
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
import AdminTransfer from "../pages/admin/AdminTransfer";
import MakeSubAdminMessMalik from "../pages/admin/MakeSubAdminMessMalik";
import SetPassword from "../pages/auth/SetPassword";
import UserBasaVaraHistory from "../pages/userDataHistory/UserBasaVaraHistory";
import UserMealHistory from "../pages/userDataHistory/UserMealHistory";
import UserBalanceHistory from './../pages/userDataHistory/UserBalanceHistory';
import UserCurrentBillHistory from './../pages/userDataHistory/UserCurrentBillHistory';
import UserIncidantalHistory from './../pages/userDataHistory/UserIncidantalHistory';
import UserKhalaBillHistory from './../pages/userDataHistory/UserKhalaBillHistory';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/*  Protected Routes (All logged-in users) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/user/balance/history" element={<UserBalanceHistory />} />
          <Route path="/user/mill/history" element={<UserMealHistory />} />
          <Route path="/user/currentBill/history" element={<UserCurrentBillHistory />} />
          <Route path="/user/khalaBill/history" element={<UserKhalaBillHistory />} />
          <Route path="/user/basaVara/history" element={<UserBasaVaraHistory />} />
          <Route path="/user/incidantal/history" element={<UserIncidantalHistory />} />
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
            <Route path="/make-sub-admin" element={<MakeSubAdminMessMalik />} />
            <Route path="/egg-rate" element={<EggRate />} />
            <Route path="/egg/:id" element={<DailayEggIncidantal />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/transfer-main-admin" element={<AdminTransfer />} />
          </Route>
        </Route>
      </Route>

      {/*  Error Route */}
      <Route path="*" element={<Errors />} />
    </Routes>
  );
};

export default AppRoutes;
