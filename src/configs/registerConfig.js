const registerConfig = {
  title: "Register",

  form: {
    fields: [
      { name: "name", type: "text", label: "Name" },
      { name: "email", type: "email", label: "Email" },
      { name: "password", type: "password", label: "Password" },
      { name: "confirmPassword", type: "password", label: "Confirm Password" },
    ],
  },

  buttons: [
      { type: "submit", text: "Register", action: "submit" },
      { type: "button", text: "Reset", action: "reset" },
    ],
};

export default registerConfig;
