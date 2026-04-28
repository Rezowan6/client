export const subAdminNav = [
  {
    group: "Daily Management",
    links: [
      { name: "Meal", path: "/mills" },
      { name: "Cost", path: "/cost" },
      { name: "Incidental", path: "/incidental-cost" },
    ],
  },
  {
    group: "User",
    links: [
      {
        name: "User List",
        path: "/get-users",
      },
      {
        name: "Balance",
        path: "/create-balance",
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
    ],
  },
];
