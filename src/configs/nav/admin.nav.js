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
