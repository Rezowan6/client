export const validateRegister = (values) => {
  const {name, email, password, confirmPassword } = values;

  const errors = {};

  // reqruired name
  if(!name) {
    errors.name = "Name is required"
  }

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

    //  confirm password required
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password required";
  }

  //  confirm password match
  else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
