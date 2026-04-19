import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { validateRole } from "../../utils/validate/validateData";
import ReusableCrudPage from "./../../components/pages/ReusableCrudPage";
import makeSubAdminConfig from "./../../configs/makeSub_admin";
import { makeSubAdmin } from "./../../services/admin/adminService";

const Make_subAdminMess_malik = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { userId: "", role: "" },
    validateRole,
  );

  const submitSubAdmin = async (data) => {
    const { userId, role } = data.values;
    try {
      const res = await makeSubAdmin({ data: { userId, role } });

      showAlert(res?.message || 'sub-admin added');
    } catch (error) {
      console.log(error)
      showAlert(error?.response?.data?.message || 'operation failed');
    }
  };

  // actual submit
  const roleSubmit = () => {
    return submitSubAdmin({
      values,
      showAlert,
      resetForm,
    });
  };

  // confirm before submit
  const roleAddConfirm = () => {
    showConfirm(
      "Role Update",
      "Are you sure you want to update this user's role?",
      roleSubmit,
    );
  };

  return (
    <>
      <ReusableCrudPage
        config={makeSubAdminConfig}
        handleChange={handleChange}
        handleSubmit={handleSubmit(roleAddConfirm)}
        errors={errors}
        values={values}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
        table={false}
        grandTotal={false}
      />
    </>
  );
};

export default Make_subAdminMess_malik;
