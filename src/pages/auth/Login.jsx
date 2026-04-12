// internal import
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils/validate/validateLogin";

const Login = () => {
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { email: "", password: "" },
    validateLogin,
  );

  const submitLogin = (data) => {
    console.log("LOGIN DATA:", data);
    resetForm();
  };

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        {/* Email */}
        <Input
          label="Email"
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        {/* Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <Button type="submit" text="Login" />
      </form>
    </>
  );
};

export default Login;
