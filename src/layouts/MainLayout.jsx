import { Outlet } from "react-router-dom";

import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/Navbar/Navbar";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto min-h-screen">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className={`
                flex-1
                transition-all duration-300
                ${collapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}
              `}
          >
          <Navbar collapsed={collapsed} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="container mt-20 mx-auto px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
