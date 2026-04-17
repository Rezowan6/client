import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/",  role: "all"},
    { name: "Login", path: "/login" },
    { name: "Create User", path: "/create-users" },
    { name: "User List", path: "/get-users" },
    { name: "Mills", path: "/mills" },
    { name: "Cost", path: "/cost" },
    { name: "Balance", path: "/create-balance" },
    { name: "Dashboard", path: "/admin-dashboard", role: "admin"},
    { name: "Incidental", path: "/incidental-cost" },
  ];

  return (
    <header id="nvbar" className="fixed w-full top-0 left-0 z-50">
      <nav className="container bg-gradient-to-r from-[#1c356b88] via-[#069b8e] to-[#1c356b88] flex justify-between items-center h-16 sm:h-20">
        <h1 className="font-lobster sm:text-2xl">LOGO</h1>

        <div
          className={`absolute top-16 sm:top-20 ${open ? "left-[0]" : "left-[-100%]"} min-h-[90vh] w-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 overflow-hidden lg:static lg:min-h-fit lg:w-auto`}
        >
          <ul className="flex flex-col items-center gap-8 lg:flex-row">
            {navLinks.map((link, index) =>( 
              <li key={index}>
                <NavLink to={link.path} onClick={() => setOpen(false)}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-0 -right-10 opacity-90 lg:hidden">
          <img src="" alt="" className="w-32" />
        </div>

        <div className="absolute -top-5 -left-5 rotate-90 opacity-90 lg:hidden">
          <img src="" alt="" className="w-32" />
        </div>

        <div className="text-xl sm:text-3xl cursor-pointer z-50 lg:hidden">
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
