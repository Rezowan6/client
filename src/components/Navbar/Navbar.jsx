import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigation } from "../../hooks/useNavigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const userRole = user?.role || "user";

  const navigation = useNavigation(userRole);
  const grpupNavigation = navigation?.filter((itmes) => itmes.group);

  const toggleGroup = (index) => {
    setOpenGroup(openGroup === index ? null : index);
  };

  return (
    <header id="nvbar" className="fixed w-full top-0 left-0 z-50">
      <nav className="container bg-gradient-to-r from-[#1c356b88] via-[#069b8e] to-[#1c356b88] flex justify-between lg:justify-evenly items-center h-16 sm:h-20">
        <div className="flex gap-2 justify-center items-center">
          {navigation
            ?.filter((item) => item.name === "Profile")
            .map((profile, idx) => (
              <NavLink key={idx} to={profile.path}>
                {profile.icon}
              </NavLink>
            ))}
        </div>

        <div
          className={`absolute top-16 ${open ? "left-[0]" : "left-[-100%]"} font-semibold min-h-[90vh] w-full backdrop-blur-md lg:backdrop-blur-none flex items-center justify-center transition-all duration-300 overflow-hidden lg:static  lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center gap-6 p-4 lg:p-0">
            {grpupNavigation?.map((group, groupIndex) => {
              return (
                <li key={groupIndex} className="relative">
                  <button
                    className="font-semibold flex items-center gap-1 hover:text-yellow-300"
                    onClick={() => toggleGroup(groupIndex)}
                    onMouseEnter={() => setOpenGroup(groupIndex)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    {group.group}
                    <span>{openGroup === groupIndex ? "▲" : "▼"}</span>
                  </button>
                  <ul
                    className={`${openGroup === groupIndex ? "block" : "hidden"} bg-[#1c356b88] rounded-md overflow-hidden lg:absolute lg:top-6 lg:left-0 min-w-[180px]`}
                  >
                    {group?.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <NavLink
                          className="block hover:text-yellow-500 px-4 py-2"
                          to={link?.path}
                          onMouseEnter={() => setOpenGroup(groupIndex)}
                          onMouseLeave={() => setOpenGroup(null)}
                          onClick={() => {
                            setOpen(false);
                            setOpenGroup(null);
                          }}
                        >
                          {link?.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden gap-4">
          <i
            className={`${open ? "ri-close-large-line" : "ri-menu-4-line"}`}
            onClick={() => setOpen(!open)}
          ></i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
