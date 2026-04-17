import { useNavigate } from "react-router-dom";

import Form from "../../components/form/Form";
import registerConfig from "../../configs/registerConfig";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { registerUser } from "./../../services/auth/authService";
import { validateRegister } from "./../../utils/validate/validateRegister";

const Register = () => {
  const navigate = useNavigate();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } = useAlert();
  const { values, errors, handleChange, resetForm } = useForm(
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

    const registerConfirm = () => {
    showConfirm(
      "Create User",
      "Are you sure you want to create this user?",
      () => submitRegister(values) // IMPORTANT FIX
    );
  };

  return (
    <>
      {/* register form */}

      <Form
        config={registerConfig}
        submitRegister={submitRegister}
        values={values}
        errors={errors}
        handleChange={handleChange}
              handleSubmit={(e) => {
        e.preventDefault();
        registerConfirm();
      }}
        resetForm={resetForm}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </>
  );
};

export default Register;
