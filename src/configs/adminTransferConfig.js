const adminTransferConfig = {
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
        name: "admin",
        type: "checkbox",
        label: "admin",
        dataGroup: "role",
      },
      {
        name: "role",
        type: "text",
        label: "Role",
      },
    ],
  },
};

export default adminTransferConfig;
