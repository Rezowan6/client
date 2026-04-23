import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button.jsx";
import Loading from "../../../components/loading/Loding.jsx";
import ReusableCrudPage from "../../../components/pages/ReusableCrudPage.jsx";
import Title from "../../../components/title/Title.jsx";
import useAlert from "../../../hooks/useAlert";
import useCrudManager from "../../../hooks/useCrudManager";
import useForm from "../../../hooks/useForm";
import useOptionsMap from "../../../hooks/useOptionsMap";
import { useTableActions } from "../../../hooks/useTableAction.jsx";
import { basaVaraValidator } from "../../../utils/validate/validateData";
import {
  useAddBasaVaraMutation,
  useGetUsersBasaVaraQuery,
  useRefreshMonthlyBasaVaraMutation,
  useUpdateBasaVaraMutation,
} from "../basaVaraApi";
import basaVaraConfig from "../configs/basaVaraConfig.jsx";

const UsersBasaVara = () => {
  const location = useLocation();
  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", basaVara: "" }, basaVaraValidator);

  const { data, isLoading, editId, setEditId, submit, editItem } =
    useCrudManager({
      useGetQuery: useGetUsersBasaVaraQuery,
      useAddMutation: useAddBasaVaraMutation,
      useUpdateMutation: useUpdateBasaVaraMutation,
    });

  const updateHook = useRefreshMonthlyBasaVaraMutation();
  const updateFn = updateHook?.[0];

  const refreshMonth = async () => {
    try {
      const res = await updateFn().unwrap();
      showAlert("Success", res?.data?.message || "Month refresh succrssfully!");
    } catch (error) {
      showAlert(error?.data?.message || "Month refresh failed");
    }
  };
  // month refresh
  const newMonthStartConfirm = () => {
    showConfirm(
      "Month reset",
      "Are you sure you want to this month refresh?",
      () => refreshMonth(),
    );
  };

  const {
    users: allUserBasaVara = [],
    grandTotalBasaVara = 0,
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
      basaVara: balance,
    };

    showConfirm(
      "Add BasaVara",
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
    if (location.state?.editBasaVara) {
      const { basaVara } = location.state.editBasaVara;
      setEditId(location.state.userId);

      setValues({
        userId: location.state.userId,
        basaVara: basaVara,
      });
    }
  }, [location.state, setValues, setEditId]);

  const itemsMap = new Map(
    (allUserBasaVara || []).map((item) => [item.userId, item]),
  );

  const finalData = (users || []).map((user) => {
    const matchedItem = itemsMap.get(user.value);

    return {
      name: user.name,
      userId: user.value,
      basaVara: matchedItem?.basaVara || 0,
      basaVaraList: matchedItem?.basaVaraList,
      isPaid: matchedItem?.isPaid || "",
    };
  });

  if (isLoading) return <Loading />;

  return (
    <section className="pb-20">
      <Title title={`Total Paid Border: ${totalPaidUser}`} />
      <ReusableCrudPage
        config={basaVaraConfig}
        title="Add Border BasaVara"
        link="basaVara"
        items={finalData}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(balanceAddConfirm)}
        actions={actions}
        totalText="Total"
        grandTotal={grandTotalBasaVara || 0}
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

export default UsersBasaVara;
