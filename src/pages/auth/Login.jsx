import { useNavigate } from "react-router-dom";

// internal import
import AlertPopup from "../../components/alertPopup/AlertPopup.jsx";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useAlert from "../../hooks/useAlert.jsx";
import useForm from "../../hooks/useForm";
import { loginUser } from "../../services/auth/authService.js";
import { validateLogin } from "../../utils/validate/validateLogin";

const Login = () => {
  const { alertData, showAlert, closeAlert, confirmAction } = useAlert();

  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { email: "", password: "" },
    validateLogin,
  );

  // from submit func
  const submitLogin = async (data) => {
    try {
      const res = await loginUser(data);
      showAlert("Success", res?.message || "User logged in success!");
      resetForm();
      navigate("/create-users");
    } catch (error) {
      showAlert("Error", error.res?.response?.data?.message || "Logged in Failed!");
    }
  };

  return (
    <>
      <div className="max-w-full mx-10 lg:max-w-3xl lg:mx-auto bg-green-200 p-5 lg:pt-10 lg:px-16 rounded-md">
        <h1 className="text-green-500 text-4xl font-serif text-center">
          Login page
        </h1>
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

export default Login;
