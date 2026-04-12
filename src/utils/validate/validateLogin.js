export const validateLogin = (values) => {
  const errors = {};

  const { email, password } = values;

  // required email
  if (!email) {
    errors.email = "Email is required";
  }

  // email format
  else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  // password required
  if (!password) {
    errors.password = "Password is required";
  }

  // password rules
  else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
