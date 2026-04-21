import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";

import userCreateConfig from "../../configs/userCreateConfig";
import { validateRegister } from "../../utils/validate/validateRegister";

import Form from "../../components/form/Form";
import { useCreateUserMutation } from "../../features/users/userApi";

const CreateUser = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const [createUser] = useCreateUserMutation();

  const { values, errors, handleChange, resetForm, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegister,
  );

  // submit API call
  const submitUser = async (data) => {
    try {
      const res = await createUser(data).unwrap();

      showAlert("Success", res?.message || "User created success!");
      resetForm();
    } catch (error) {
      showAlert("Error", error?.data?.message || "User create failed");
    }
  };

  // confirm before submit
  const createConfirm = () => {
    showConfirm(
      "Create User",
      "Are you sure you want to create this user?",
      () => submitUser(values), // IMPORTANT FIX
    );
  };

  return (
    <>
      <div className="mt-32 sm:mt-0">
        <Form
          config={userCreateConfig}
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit(createConfirm)}
          resetForm={resetForm}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
        />
      </div>
    </>
  );
};

export default CreateUser;
