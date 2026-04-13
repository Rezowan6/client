import { useNavigate } from "react-router-dom";

// internal import
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { loginUser } from "../../services/auth/authService.js";
import { validateLogin } from "../../utils/validate/validateLogin";

const Login = () => {
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { email: "", password: "" },
    validateLogin,
  );

  // from submit func
  const submitLogin = async (data) => {
    console.log({data})
    try {
      const res = await loginUser(data);
      console.log("Login success", res);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.log(error.res?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="max-w-full mx-10 lg:max-w-3xl lg:mx-auto bg-green-200 p-5 lg:pt-10 lg:px-16 rounded-md">
        <h1 className="text-green-500 text-4xl font-serif text-center">Login page </h1>
        <form onSubmit={handleSubmit(submitLogin)}>
          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter Email"
          />

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter password"
          />

          <div className=" mt-8 flex gap-3 w-full">
            <Button type="submit" text="Login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
