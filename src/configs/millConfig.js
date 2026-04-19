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
        name: "1",
        type: "checkbox",
        label: "1",
        dataGroup:"mill",
      },
      {
        name: "2",
        type: "checkbox",
        label: "2",
        dataGroup:"mill",
      },
      {
        name: "3",
        type: "checkbox",
        label: "3",
        dataGroup:"mill",
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
