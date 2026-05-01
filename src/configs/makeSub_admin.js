const makeSubAdminConfig = {
  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
        required: true,
      },
      {
        name: "subAdmin",
        type: "checkbox",
        label: "subAdmin",
        dataGroup:"role",
      },
      {
        name: "messMalik",
        type: "checkbox",
        label: "messMalik",
        dataGroup:"role",
      },
      {
        name: "role",
        type: "text",
        label: "Role",
      },
    ],
  },
    table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
    ],
  }
};

export default makeSubAdminConfig;
