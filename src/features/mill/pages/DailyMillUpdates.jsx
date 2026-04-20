import Loading from "../../../components/loading/Loding";
import ReusableCrudPage from "../../../components/pages/ReusableCrudPage";

import useAlert from "../../../hooks/useAlert";
import useForm from "../../../hooks/useForm";

import millConfig from "../config/millConfig.jsx";

import useMillCrud from "../hooks/useMillCrud";

import { validateMill } from "../../../utils/validate/validateData";

import { millAddConfirm } from "../utils/millActions";

import { millTableActions } from "../utils/millTableActions";

const DailyMillUpdates = () => {
  // ALERT
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  // FORM
  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", mill: "" }, validateMill);

  // CRUD
  const { items, data, isLoading, editId, submit, editItem } = useMillCrud();

  // ACTIONS
  const actions = millTableActions(editItem, setValues);

  const quickMillAdd = (user, millValue) => {
    const values = {
      userId: user.userId,
      mill: millValue,
    };

    showConfirm(
      "Add Mill",
      `Add ${millValue} mill for ${user.name}?`,

      () =>
        submit({
          values,
          showAlert,
          resetForm,
        }),
    );
  };

  if (isLoading) return <Loading />;

  return (
    <section className="pb-20">
      <ReusableCrudPage
        config={millConfig}
        title="Meal Added"
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        onAddMillClick={quickMillAdd}
        handleSubmit={handleSubmit(() =>
          millAddConfirm({
            showConfirm,
            submit,
            values,
            showAlert,
            resetForm,
          }),
        )}
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

export default DailyMillUpdates;
