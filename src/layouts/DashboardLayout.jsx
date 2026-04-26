import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />
        <main className="mt-20 p-6 container mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;