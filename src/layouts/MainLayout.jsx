import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1">
          {/* <Navbar /> */}

          <main className="mt-20 p-6 container mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
