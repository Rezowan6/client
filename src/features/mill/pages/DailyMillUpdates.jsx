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

import useOptionsMap from "../../../hooks/useOptionsMap.js";

const DailyMillUpdates = () => {
  const location = useLocation();
  const { users } = useOptionsMap();

  // ALERT
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  // FORM
  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", mill: "", day: "" }, validateMill);

  // CRUD
  const { items, data, isLoading, isErrors, editId, setEditId, submit, } =
    useMillCrud();

  // quick Mill add
  const quickMillAdd = (user, millValue) => {
    const values = {
      userId: user.userId,
      mill: millValue,
    };

    showConfirm(
      "Add Meal",
      `Are you sure you want to add ${millValue} meal for ${user.name}?`,

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

  const itemsMap = items.reduce((acc, item) => {
    acc[item.userId] = item;
    return acc;
  }, {})

  const finalData = users?.map((user) => {
    const matchedItem = itemsMap[user?.value];
    return {
      userId: user?.value,
      name: user?.name,
      dailyMill: matchedItem?.dailyMill,
      totalMill: matchedItem?.totalMill,
    }
  })

  if (isLoading) return <Loading />;
  if (isErrors) return <p>Internal server error{isErrors}</p>;

  return (
    <section className="pb-20">
      <ReusableCrudPage
        config={millConfig}
        title="Meal Added"
        link="meal"
        items={finalData}
        values={values}
        editId={editId}
        handleChange={handleChange}
        quickAdd={quickMillAdd}
        handleSubmit={handleSubmit(() =>
          millAddConfirm({
            showConfirm,
            submit,
            values,
            showAlert,
            resetForm,
          }),
        )}
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
