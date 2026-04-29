const setPasswordConfig = {
  title: "Set password",

  form: {
    fields: [
      { name: "name", type: "name", label: "name" },
      { name: "email", type: "email", label: "Email" },
      { name: "password", type: "password", label: "Password" },
    ],
  },

  buttons: [
      { type: "submit", text: "Submit", action: "submit" },
    ],
};

export default setPasswordConfig;