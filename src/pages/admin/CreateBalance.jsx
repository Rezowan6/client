import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loding";
import ReusableCrudPage from "../../components/pages/ReusableCrudPage";
import balanceConfig from "../../configs/balanceConfig.jsx";
import {
  useAddBalanceMutation,
  useGetUsersBalanceQuery,
  useUpdateBalanceMutation,
} from "../../features/balance/balanceApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import useOptionsMap from "../../hooks/useOptionsMap";
import { validateBalance } from "../../utils/validate/validateData";

const CreateBalance = () => {
  const location = useLocation();

  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", tk: "", day: "" }, validateBalance);

  const { items, data, isLoading, editId, submit, setEditId } = useCrudManager({
    useGetQuery: useGetUsersBalanceQuery,
    useAddMutation: useAddBalanceMutation,
    useUpdateMutation: useUpdateBalanceMutation,
  });

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
      tk: balance,
    };

    showConfirm(
      "Add Balance",
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
    if (location.state?.editDailyTk) {
      const { day, tk } = location.state.editDailyTk;
      setEditId(location.state.userId);

      setValues({
        userId: location.state.userId,
        tk,
        day,
      });
    }
  }, [location.state, setValues, setEditId]);

  const itemsMap = items?.reduce((acc, item) => {
    acc[item?.userId] = item;
    return acc;
  }, {});

  const finalData = users?.map((user) => {
    const matchedItem = itemsMap[user?.value];

    return {
      name: user?.name,
      userId: user?.value,
      dailyTk: matchedItem?.dailyTk,
      totalTk: matchedItem?.totalTk,
    };
  });

  if (isLoading) return <Loading />;

  return (
    <section className="pb-20">
      <ReusableCrudPage
        config={balanceConfig}
        title="Add Border Balance"
        link="balance"
        items={finalData}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(balanceAddConfirm)}
        totalText="Total"
        grandTotal={data?.data?.grandTotalTk || 0}
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
        quickAdd={quickBalanceAdd}
      />
    </section>
  );
};

export default CreateBalance;
