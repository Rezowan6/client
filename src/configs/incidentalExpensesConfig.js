const incidentalExpensesConfig = {
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
        name: "otherCost",
        type: "number",
        label: "OtherCost",
      },
      {
        name: "egg",
        type: "number",
        label: "Egg",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalOtherCost", label: "OtherCost" },
      { key: "totalEgg", label: "Egg" },
    ],
  },

  totalKey: "grandTotalIncidnetal",
};

export default incidentalExpensesConfig;
