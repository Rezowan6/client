import EditBtn from "../../components/Button/EditBtn";

import useCrudManager from "../../hooks/useCrudManager";

import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { validateMill } from "../../utils/validate/validateData";
import millConfig from "../../configs/millConfig";
import { useAddMillMutation, useGetUsersMillQuery, useUpdateMillMutation } from "../../features/mill/millApi";
import ReusableCrudPage from "../../components/pages/ReusableCrudPage";

const MillUpdate = () => {

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", mill: "" }, validateMill);

  const { items, data, isLoading, editId, submit, editItem } = useCrudManager({
                                                              useGetQuery: useGetUsersMillQuery,
                                                              useAddMutation: useAddMillMutation,
                                                              useUpdateMutation: useUpdateMillMutation,
                                                              keyField1: "dailyMill",
                                                              keyField2: "mill",
                                                            });

  const millSubmit = () => submit({ values, showAlert, resetForm });

  // confirm before mill add
  const millAddConfirm = (data) => {
    showConfirm(
      "mill added",
      "Are you sure you want to mill added this user?",
      () => millSubmit(data),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="text-white p-6">
      <ReusableCrudPage
        config={millConfig}
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(millAddConfirm)}
        actions={actions}
        grandTotal={data?.data?.grandTotalMill || 0}
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </div>
  );
};

export default MillUpdate;
