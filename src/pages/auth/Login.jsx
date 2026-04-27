import { useNavigate } from "react-router-dom";

// internal import
import Form from "../../components/form/Form.jsx";
import loginConfig from "../../configs/loginConfig.js";
import useAlert from "../../hooks/useAlert.jsx";
import useForm from "../../hooks/useForm";
import { loginUser } from "../../services/auth/authService.js";
import { validateLogin } from "../../utils/validate/validateLogin";

const Login = () => {
  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const navigate = useNavigate();

  const { values, errors, handleChange, resetForm, handleSubmit } = useForm(
    { email: "", password: "" },
    validateLogin,
  );

  // from submit func
  const submitLogin = async (data) => {
    try {
      const res = await loginUser(data);
      console.log({res});

      //  token save
      localStorage.setItem("accessToken", res?.data?.accessToken);

      //  user save
      localStorage.setItem("user", JSON.stringify(res?.data?.user));

      showAlert("Success", res?.message || "User logged in success!");

      resetForm();

      navigate("/profile");
    } catch (error) {
      showAlert("Error", error?.response?.data?.message || "Logged in Failed!");
    }
  };

  // login confirm
  const loginConfirm = () => {
    showConfirm(
      "Login",
      "Are you sure you want to login?",
      () => submitLogin(values), // IMPORTANT FIX
    );
  };

  return (
    <>
      <div className="mt-32 sm:mt-0">
        <Form
          config={loginConfig}
          values={values}
          errors={errors}
          handleChange={handleChange}
          resetForm={resetForm}
          handleSubmit={handleSubmit(loginConfirm)}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
        />
      </div>
    </>
  );
};

export default Login;
