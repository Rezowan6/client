import { NavLink } from "react-router-dom";

import { useNavigation } from "../../hooks/useNavigation";

const Navbar = ({ collapsed, setSidebarOpen, sidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const userRole = user?.role || "user";

  const navigation = useNavigation(userRole);

  return (
    <header
      className={`fixed top-0 left-0 py-5 container flex justify-between items-center gap-10 w-[100%] ${collapsed ? "lg:ml-[80px]" : "lg:ml-[260px] "} transition-all duration-300 border-b border-gray-700`}
    >
      <button
        className="lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <div>
        {navigation
          ?.filter((item) => item.name === "Profile")
          .map((profile, idx) => (
            <NavLink key={idx} to={profile.path}>
              {profile.icon}
            </NavLink>
          ))}
      </div>

    </header>
  );
};

export default Navbar;
