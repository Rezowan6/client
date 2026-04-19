const loginConfig = {
  title: "Logged In",

  form: {
    fields: [
      { name: "email", type: "email", label: "Email" },
      { name: "password", type: "password", label: "Password" },
    ],
  },

  buttons: [
      { type: "submit", text: "Login", action: "submit" },
    ],
};

export default loginConfig;