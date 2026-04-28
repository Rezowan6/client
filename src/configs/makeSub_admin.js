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
        name: "sub_admin",
        type: "checkbox",
        label: "sub_admin",
        dataGroup:"role",
      },
      {
        name: "mess_malik",
        type: "checkbox",
        label: "mess_malik",
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
