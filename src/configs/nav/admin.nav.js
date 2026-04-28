export const adminNav = [
  {
    group: "User Management",
    links: [
      {
        name: "Create User",
        path: "/create-users",
      },
      {
        name: "User List",
        path: "/get-users",
      },
      {
        name: "Make Sub Admin",
        path: "/make-sub-admin",
      },
    ],
  },
  {
    group: "Daily Management",
    links: [
      { name: "Meal", path: "/mills" },
      { name: "Cost", path: "/cost" },
      { name: "Incidental", path: "/incidental-cost" },
    ],
  },

  {
    group: "Billing",
    links: [
      {
        name: "Current Bill",
        path: "/current-bill",
      },
      {
        name: "Khala Bill",
        path: "/khala-bill",
      },
      {
        name: "Balance",
        path: "/create-balance",
      },
      {
        name: "BasaVara",
        path: "/basa-vara",
      },
    ],
  },

  {
    group: "System",
    links: [
      {
        name: "Dashboard",
        path: "/admin-dashboard",
      },
    ],
  },
];
