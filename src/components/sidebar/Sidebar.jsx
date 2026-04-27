import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";

const Sidebar = ({collapsed, setCollapsed, sidebarOpen, setSidebarOpen}) => {
  const [openGroup, setOpenGroup] = useState(null);

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "user";

  const navigation = useNavigation(userRole);

  const groupNavigation = navigation?.filter((item) => item.group);

  //  Auto open active group
  useEffect(() => {
    groupNavigation?.forEach((group, index) => {
      const hasActive = group.links.some(
        (link) => location.pathname === link.path,
      );

      if (hasActive) {
        setOpenGroup(index);
      }
    });
  }, [location.pathname]);

  const toggleGroup = (index) => {
    setOpenGroup(openGroup === index ? null : index);
  };

  return (
    <>
      {/* Mobile Toggle Button */}

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:fixed
          top-0 left-0
          h-screen
          z-50
          bg-[#0f172a]
          text-white
          transition-all duration-300
          
          ${collapsed ? "lg:w-[80px] w-[260px]" : "w-[260px]"}
          
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          {!collapsed && <h2 className="text-lg font-bold">Admin Panel</h2>}

          {/* Collapse Button */}
          <button
            className="hidden lg:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "➡" : "⬅"}
          </button>
        </div>

        {/* Menu */}
        <ul className="p-3 space-y-2">
          {groupNavigation?.map((group, groupIndex) => (
            <li key={groupIndex}>
              {/* Group Button */}
              <button
                onClick={() => toggleGroup(groupIndex)}
                className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-[#1e293b]"
              >
                <span>{!collapsed && group.group}</span>

                {!collapsed && (
                  <span>{openGroup === groupIndex ? "▼" : "▶"}</span>
                )}
              </button>

              {/* Links */}
              <ul
                className={`overflow-hidden transition-all duration-300 ${
                  openGroup === groupIndex ? "max-h-96" : "max-h-0"
                }`}
              >
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <NavLink
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `block px-6 py-2 rounded mt-1 hover:bg-[#334155] ${
                          isActive ? "bg-[#069b8e]" : ""
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
