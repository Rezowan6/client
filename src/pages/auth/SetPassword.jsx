import { useNavigate, useParams } from "react-router-dom";

// internal import
import Form from "../../components/form/Form.jsx";
import setPasswordConfig from "../../configs/login/setPasswordConfig.js";
import useAlert from "../../hooks/useAlert.jsx";
import useForm from "../../hooks/useForm";
import { setpassword } from "../../services/auth/authService.js";
import { setpasswordValidator } from "../../utils/validate/validateRegister.js";

const SetPassword = () => {
  const { token } = useParams();

  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const navigate = useNavigate();

  const { values, errors, handleChange, resetForm, handleSubmit } = useForm(
    { name: "", email: "", password: "" },
    setpasswordValidator,
  );

  // from submit func
  const submitLogin = async (data) => {
    try {
      const res = await setpassword({data, token});

      //  token save
      localStorage.setItem("accessToken", res?.data?.accessToken);

      //  user save
      localStorage.setItem("user", JSON.stringify(res?.data?.user));

      showAlert("Success", res?.message || "User logged in success!");

      resetForm();

      navigate("/");
    } catch (error) {
        console.log(error.response.data)
      showAlert("Error", error?.response?.data?.message || "Logged in Failed!");
    }
  };

  // login confirm
  const loginConfirm = () => {
    showConfirm("Login", "Are you sure you want to login?", () =>
      submitLogin(values),
    );
  };

  return (
    <>
      <div className="mt-32 sm:mt-0">
        <Form
          config={setPasswordConfig}
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

export default SetPassword;
