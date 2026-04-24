import { useLocation } from "react-router-dom";

import { useEffect } from "react";
import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableCrudPage from "../../components/pages/ReusableCrudPage";
import Title from "../../components/title/Title";
import {
  useAddKhalaBillMutation,
  useGetKhalaBillQuery,
  useMonthlyRefreshKhalaBillMutation,
  useUpdateKhalaBillMutation,
} from "../../features/khalaBill/khalaBillApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import useOptionsMap from "../../hooks/useOptionsMap";
import { useTableActions } from "../../hooks/useTableAction";
import { khalaBillValidator } from "../../utils/validate/validateData";
import khalaBillConfig from "./../../features/khalaBill/config/khalaBillConfig";

const KhalaBillCreate = () => {
  const location = useLocation();
  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", khalaBill: "", month: "" }, khalaBillValidator);

  const { data, isLoading, editId, setEditId, submit, editItem } =
    useCrudManager({
      useGetQuery: useGetKhalaBillQuery,
      useAddMutation: useAddKhalaBillMutation,
      useUpdateMutation: useUpdateKhalaBillMutation,
    });

  const updateHook = useMonthlyRefreshKhalaBillMutation();
  const updateFn = updateHook?.[0];


  const refreshMonth = async () => {
    try {
      const res = await updateFn().unwrap();
      showAlert("Success", res?.data?.message || "Month refresh succrssfully!");
    } catch (error) {
      showAlert("Error", error?.data?.message || "Month refresh failed");
    }
  };
  // month refresh
  const newMonthStartConfirm = () => {
    showConfirm(
      "Month Refresh",
      "Are you sure you want to refresh this month?",
      () => refreshMonth(),
    );
  };

  const {
    users: allUserKhalaBill = [],
    grandTotalKhalaBill = 0,
    totalPaidUser = 0,
  } = data?.data || {};

  const balanceSubmit = () => submit({ values, showAlert, resetForm });

  // confirm before balance add
  const balanceAddConfirm = (data) => {
    showConfirm(
      "Balance added",
      "Are you sure you want to balance added this user?",
      () => balanceSubmit(data),
    );
  };

  const actions = useTableActions(editItem, setValues);

  const quickBalanceAdd = (user, balance) => {
    const values = {
      userId: user.userId,
      khalaBill: balance,
    };

    showConfirm(
      "Add Current Bill",
      `Add ${balance} balance for ${user.name}?`,

      () =>
        submit({
          values,
          showAlert,
          resetForm,
        }),
    );
  };

  useEffect(() => {
    if (location.state?.editKhalaBill) {
      const { khalaBill, month } = location.state.editKhalaBill;
      setEditId(location.state.userId);
      setValues({
        userId: location.state.userId,
        khalaBill,
        month,
      });
    }
  }, [location.state, setValues, setEditId]);

  const itemsMap = new Map(
    (allUserKhalaBill || []).map((item) => [item.userId, item]),
  );

  const finalData = (users || []).map((user) => {
    const matchedItem = itemsMap.get(user.value);

    return {
      name: user.name,
      userId: user.value,
      khalaBill: matchedItem?.khalaBill || 0,
      khalaBillList: matchedItem?.khalaBillList,
      isPaid: matchedItem?.isPaid || "",
    };
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <section className="pb-20">
        <Title title={`Total Paid: ${totalPaidUser}`} />
        <ReusableCrudPage
          config={khalaBillConfig}
          title="Add Monthly Khala Bill"
          link="khalaBill"
          items={finalData}
          values={values}
          editId={editId}
          handleChange={handleChange}
          handleSubmit={handleSubmit(balanceAddConfirm)}
          actions={actions}
          totalText="Total"
          grandTotal={grandTotalKhalaBill || 0}
          errors={errors}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
          quickAdd={quickBalanceAdd}
        />

        <Button
          type="button"
          text="New month start"
          onclickHandle={newMonthStartConfirm}
        />
      </section>
    </>
  );
};

export default KhalaBillCreate;
