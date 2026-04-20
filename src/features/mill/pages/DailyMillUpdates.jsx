import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  // ALERT
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  // FORM
  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", mill: "" }, validateMill);

  // CRUD
  const { items, data, isLoading, isErrors, editId, setEditId, submit, editItem } =
    useMillCrud();

  // ACTIONS
  const actions = millTableActions(editItem, setValues);

  // quick Mill add
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

  useEffect(() => {
    if (location.state?.editDailyMill) {
      const { day, mill } = location.state.editDailyMill;
      setEditId(location.state.userId)

      setValues({
        userId: location.state.userId,
        mill: mill,
        day: day,
      });
    }
  }, [location.state, setValues, setEditId]);

  if (isLoading) return <Loading />;
  if (isErrors) return <p>Internal server error{isErrors}</p>;

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
        link={true}
      />
    </section>
  );
};

export default DailyMillUpdates;
