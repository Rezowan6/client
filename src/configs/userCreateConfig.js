const userCreateConfig = {
  title: "Add User",

  form: {
    fields: [
      { name: "email", type: "email", label: "Email" },
    ],
  },

  buttons: [
      { type: "submit", text: "Invite", action: "submit" },
    ],
};

export default userCreateConfig;