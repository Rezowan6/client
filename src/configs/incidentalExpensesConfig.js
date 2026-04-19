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
        label: "Other-Cost",
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
      { key: "totalOtherCost", label: "Other-Cost" },
      { key: "totalEgg", label: "Egg" },
    ],
  },

  totalKey: "grandTotalIncidnetal",
};

export default incidentalExpensesConfig;
