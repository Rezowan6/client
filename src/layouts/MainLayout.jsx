import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* <Sidebar /> */}
        <div className="flex-1 flex flex-col">
          {/* <Navbar /> */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
