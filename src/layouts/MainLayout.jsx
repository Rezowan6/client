import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
<div className="flex flex-col lg:flex-row max-w-7xl mx-auto min-h-screen">
  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

  <div className={`
    flex-1
    transition-all duration-300
    ${collapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"}
  `}>
    {/* <Navbar /> */}

    <main className="container mx-auto px-4">
      <Outlet />
    </main>
  </div>
  
</div>
    </>
  );
};

export default MainLayout;
