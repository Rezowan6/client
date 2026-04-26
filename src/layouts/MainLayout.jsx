import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <div>
        {/* <Sidebar /> */}
        <div>
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
