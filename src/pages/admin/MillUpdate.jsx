import EditBtn from "../../components/Button/EditBtn";

import useCrudManager from "../../hooks/useCrudManager";

import ReusableCrudPage from "../../components/pages/ReusableCrudPage";
import millConfig from "../../configs/millConfig";
import {
  useAddMillMutation,
  useGetUsersMillQuery,
  useUpdateMillMutation,
} from "../../features/mill/millApi";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { validateMill } from "../../utils/validate/validateData";
import Loading from "../../components/loading/Loding";

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

  if (isLoading) return <Loading />;

  return (
    <section className="pb-20">
      <ReusableCrudPage
        config={millConfig}
        title="meal Added"
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(millAddConfirm)}
        actions={actions}
        grandTotal={data?.data?.grandTotalMill || 0}
        totalText="Total"
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </section>
  );
};

export default MillUpdate;
