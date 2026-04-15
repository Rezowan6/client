import { useNavigate } from "react-router-dom";

import AlertPopup from "../../components/alertPopup/AlertPopup";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { validateRegister } from "../../utils/validate/validateRegister";
import { registerUser } from "./../../services/auth/authService";

const Register = () => {
  const navigate = useNavigate();

  const { alertData, showAlert, closeAlert, confirmAction } = useAlert();

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

      showAlert("Success", res?.message || "User delete success!");

      resetForm();

      if (res?.data?.success) {
        navigate("/login");
      }
    } catch (error) {
      showAlert(
        "Error",
        error?.response?.data?.message || "User Register failed!",
      ); // show to user
    }
  };

  return (
    <>
      {/* register form */}
      <div className="max-w-full mx-10 lg:max-w-3xl lg:mx-auto bg-green-200 p-5 lg:pt-10 lg:px-16 rounded-md">
        <div>
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
      </div>

      <AlertPopup
        show={alertData.show}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        autoHide={alertData.autoHide}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default Register;
