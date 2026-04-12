import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { validateRegister } from "../../utils/validate/validateRegister";
import { registerUser } from "./../../services/auth/authService";

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegister,
  );

  // submit register
  const submitRegister = async (data) => {
    try {
      const res = await registerUser(data);

      console.log(res);

      alert(res, "Registration successful");

      resetForm();

      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      resetForm();

      alert(message); // show to user
    }
  };

  return (
    <>
      <div className="max-w-full mx-10 lg:max-w-3xl lg:mx-auto bg-green-200 p-5 lg:pt-10 lg:px-16 rounded-md">
        <h1 className="text-green-500 text-4xl font-serif text-center">
          Register page
        </h1>
        <form onSubmit={handleSubmit(submitRegister)}>
          {/* name */}
          <Input
            label="Name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter Name"
          />

          {/* email */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter Email"
          />

          {/* password */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter Password"
          />

          {/* Confirm Password */}
          <Input
            label="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Enter confirmPassword"
          />

          <div className=" mt-8 flex gap-3 w-full">
            <Button type="submit" text="Register" />
            <Button type="button" text="Reset" onclickHandle={resetForm} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
