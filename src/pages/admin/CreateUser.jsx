import AlertPopup from "../../components/alertPopup/AlertPopup";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";

import { validateRegister } from "../../utils/validate/validateRegister";

import { useCreateUserMutation } from "../../features/users/userApi";

const CreateUser = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateRegister,
  );
  //  submit user
  const submitUser = async (data) => {
    try {
      const res = await createUser(data).unwrap();

      showAlert("Success", res?.message || "User created success!");

      resetForm();
    } catch (error) {
      showAlert("Error", error?.data?.message || "User create failed");
    }
  };

  // confirm before create
  const createConfirm = (data) => {
    showConfirm(
      "Create User",
      "Are you sure you want to create this user?",
      () => submitUser(data),
    );
  };

  return (
    <div>
      <div className="max-w-full mx-10 lg:max-w-3xl lg:mx-auto bg-green-200 p-5 lg:pt-10 lg:px-16 rounded-md">
        <h1 className="text-green-500 text-4xl font-serif text-center">
          Add Users
        </h1>

        <form onSubmit={handleSubmit(()=> createConfirm(values))}>
          <Input
            label="Name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder='Enter Name'
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder='Enter Email'
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder='Enter Password'
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder='Enter ConfirmPassword'
            error={errors.confirmPassword}
          />

          <div className="mt-8 flex gap-3 w-full">
            <Button type="submit" text={isLoading ? "Creating..." : "Add"} />

            <Button type="button" text="Reset" onclickHandle={resetForm} />
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
    </div>
  );
};

export default CreateUser;
