import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableCrudPage from "../../../components/pages/ReusableCrudPage";
import Title from "../../../components/title/Title";
import useAlert from "../../../hooks/useAlert";
import useCrudManager from "../../../hooks/useCrudManager";
import useForm from "../../../hooks/useForm";
import useOptionsMap from "../../../hooks/useOptionsMap";
import { currentBillValidator } from "../../../utils/validate/validateData";
import billConfig from "../config/CurrentBillConfig";
import {
  useAddCurrentBillMutation,
  useGetCurrentBillQuery,
  useMonthlyRefreshCurrentBillMutation,
  useUpdateCurrentBillMutation,
} from "../currentBillsApi";

const CurrentBills = () => {
  const location = useLocation();
  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", balance: "", month: "" }, currentBillValidator);

  const { data, isLoading, editId, setEditId, submit } = useCrudManager({
    useGetQuery: useGetCurrentBillQuery,
    useAddMutation: useAddCurrentBillMutation,
    useUpdateMutation: useUpdateCurrentBillMutation,
  });

  const updateHook = useMonthlyRefreshCurrentBillMutation();
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
    users: allUserCurrentBill = [],
    grandTotalCurrentBill = 0,
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

  const quickBalanceAdd = (user, balance) => {
    const values = {
      userId: user.userId,
      balance,
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
    if (location.state?.editBill) {
      const data = location.state.editBill;
      setEditId(location.state.userId);

      setValues({
        userId: location.state.userId,
        ...data,
      });
    }
  }, [location.state, setValues, setEditId]);

  const itemsMap = new Map(
    (allUserCurrentBill || []).map((item) => [item.userId, item]),
  );

  const finalData = (users || []).map((user) => {
    const matchedItem = itemsMap.get(user.value);

    return {
      name: user.name,
      userId: user.value,
      balance: matchedItem?.balance || 0,
      currentBillList: matchedItem?.currentBillList,
      isPaid: matchedItem?.isPaid || "",
    };
  });

  console.log({itemsMap,users, allUserCurrentBill})

  if (isLoading) return <Loading />;
  return (
    <section className="pb-20">
      <Title title={`Total Paid: ${totalPaidUser}`} />
      <ReusableCrudPage
        config={billConfig}
        title="Add Monthly Current Bill"
        link="currentBill"
        items={finalData}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(balanceAddConfirm)}
        totalText="Total"
        grandTotal={grandTotalCurrentBill || 0}
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
  );
};

export default CurrentBills;
