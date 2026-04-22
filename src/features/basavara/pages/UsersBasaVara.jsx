import Button from "../../../components/Button/Button.jsx";
import EditBtn from "../../../components/Button/EditBtn.jsx";
import Loading from "../../../components/loading/Loding.jsx";
import ReusableCrudPage from "../../../components/pages/ReusableCrudPage.jsx";
import Title from "../../../components/title/Title.jsx";
import useAlert from "../../../hooks/useAlert";
import useCrudManager from "../../../hooks/useCrudManager";
import useForm from "../../../hooks/useForm";
import useOptionsMap from "../../../hooks/useOptionsMap";
import { basaVaraValidator } from "../../../utils/validate/validateData";
import {
  useAddBasaVaraMutation,
  useDeletehMonthlyBasaVaraMutation,
  useGetUsersBasaVaraQuery,
  useUpdateBasaVaraMutation,
} from "../basaVaraApi";
import basaVaraConfig from "../configs/basaVaraConfig.jsx";

const UsersBasaVara = () => {
  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", basaVara: "" }, basaVaraValidator);

  const { data, isLoading, editId, submit, editItem, deleteItem } =
    useCrudManager({
      useGetQuery: useGetUsersBasaVaraQuery,
      useAddMutation: useAddBasaVaraMutation,
      useUpdateMutation: useUpdateBasaVaraMutation,
      useDeleteMutation: useDeletehMonthlyBasaVaraMutation,
      keyField5: "basaVara",
    });

  const {
    basaVaraList = [],
    totalBasaVara = 0,
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
  // month reset
  const newMonthStartConfirm = () => {
    showConfirm(
      "Month reset",
      "Are you sure you want to this month reset?",
      () => deleteItem(null, showAlert),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    },
  ];
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

  const itemsMap = new Map(
    (basaVaraList || []).map((item) => [item.userId, item]),
  );

  const finalData = (users || []).map((user) => {
    const matchedItem = itemsMap.get(user.value);

    return {
      name: user.name,
      userId: user.value,
      basaVara: matchedItem?.basaVara || 0,
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
        items={finalData}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(balanceAddConfirm)}
        actions={actions}
        totalText="Total"
        grandTotal={totalBasaVara || 0}
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
