const balanceConfig = {
  title: "Balance",

  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "tk",
        type: "number",
        label: "Balance",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalTk", label: "Balance" },
    ],
  },

  totalKey: "grandTotalTk",
};

export default balanceConfig;