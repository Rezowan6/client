import { useNavigate } from "react-router-dom";

// internal import
import loginConfig from "../../configs/loginConfig.js";
import useAlert from "../../hooks/useAlert.jsx";
import useForm from "../../hooks/useForm";
import { loginUser } from "../../services/auth/authService.js";
import { validateLogin } from "../../utils/validate/validateLogin";
import Form from "../../components/form/Form.jsx";

const Login = () => {
  const { alertData, showAlert, closeAlert, confirmAction } = useAlert();

  const navigate = useNavigate();

  const { values, errors, handleChange, resetForm, showConfirm } = useForm(
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
      showAlert(
        "Error",
        error.res?.response?.data?.message || "Logged in Failed!",
      );
    }
  };

  const loginConfirm = () => {
    showConfirm(
      "Login",
      "Are you sure you want to login?",
      () => submitLogin(values), // IMPORTANT FIX
    );
  };

  return (
    <>
      <Form
        config={loginConfig}
        submitRegister={submitLogin}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={(e) => {
          e.preventDefault();
          loginConfirm();
        }}
        resetForm={resetForm}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </>
  );
};

export default Login;
