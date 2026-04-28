import Loading from "../../components/loading/Loding";
import {
  useGetSubAdminQuery,
  useUpdateSubAdminMutation,
} from "../../features/role/roleApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import { useTableActions } from "../../hooks/useTableAction";
import { validateRole } from "../../utils/validate/validateData";
import ReusableCrudPage from "./../../components/pages/ReusableCrudPage";
import makeSubAdminConfig from "./../../configs/makeSub_admin";

const Make_subAdminMess_malik = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", role: "" }, validateRole);

  const { items, isLoading, editId, setEditId, submit, } =
    useCrudManager({
      useGetQuery: useGetSubAdminQuery,
      useUpdateMutation: useUpdateSubAdminMutation,
    });

  // actual submit
  const roleSubmit = () => {
    return submit({
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
  // remove role
  const removeRole = (id) => {
    setEditId(id);
    return submit({ values: id, showAlert, resetForm });
  };

  const roleRemoveConfirm = (id) => {
    showConfirm(
      "Role Remove",
      "Are you sure you want to remove this user's role?",
      () => removeRole(id),
    );
  };

  const actions = useTableActions({
    onDelete: roleRemoveConfirm,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <ReusableCrudPage
        config={makeSubAdminConfig}
        title="Add sub-admin and Mess-malik"
        items={items}
        handleChange={handleChange}
        handleSubmit={handleSubmit(roleAddConfirm)}
        errors={errors}
        values={values}
        editId={editId}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
        actions={actions}
        grandTotal={items?.length}
        totalText="Total"
      />
    </>
  );
};

export default Make_subAdminMess_malik;
