const millConfig = {
  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "mill",
        type: "number",
        label: "Mill",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalMill", label: "Mill" },
    ],
  },

  totalKey: "grandTotalMill",
};

export default millConfig;