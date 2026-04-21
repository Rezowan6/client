export const navLinks = [
  { name: "Home", path: "/", role: ["all"] },
  { name: "Login", path: "/login", role: ["all"] },

  { name: "Create User", path: "/create-users", role: ["admin"] },

  { name: "User List", path: "/get-users", role: ["admin", 'sub_admin'] },

  { name: "Mills", path: "/mills", role: ["admin"] },

  { name: "Cost", path: "/cost", role: ["admin"] },

  { name: "Egg-Rate", path: "/egg-rate", role: ["admin"] },

  { name: "Balance", path: "/create-balance", role: ["admin",'sub_admin'] },

  { name: "Dashboard", path: "/admin-dashboard", role: ["admin"] },

  { name: "Incidental", path: "/incidental-cost", role: ["admin"] },

  { name: "Make-Sub-Admin", path: "/make-sub-admin", role: ["admin"] },
];
