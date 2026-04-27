import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
<div className="flex flex-col lg:flex-row max-w-7xl mx-auto min-h-screen">
  <Sidebar />

  <div className="flex-1">
    {/* <Navbar /> */}

    <main className="mt-20 container mx-auto px-4">
      <Outlet />
    </main>
  </div>
  
</div>
    </>
  );
};

export default MainLayout;
