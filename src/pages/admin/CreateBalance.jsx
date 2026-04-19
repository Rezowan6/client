
import EditBtn from "../../components/Button/EditBtn";
import Loading from "../../components/loading/Loding";
import ReusableCrudPage from "../../components/pages/ReusableCrudPage";
import balanceConfig from "../../configs/balanceConfig";
import {
  useAddBalanceMutation,
  useGetUsersBalanceQuery,
  useUpdateBalanceMutation,
} from "../../features/balance/balanceApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import { validateBalance } from "../../utils/validate/validateData";

const CreateBalance = () => {

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } = useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } = useForm({ userId: "", tk: "" }, validateBalance);

  const { items, data, isLoading, editId, submit, editItem } = useCrudManager({
                                                                      useGetQuery: useGetUsersBalanceQuery,
                                                                      useAddMutation: useAddBalanceMutation,
                                                                      useUpdateMutation: useUpdateBalanceMutation,
                                                                      keyField1: "dailyTk",
                                                                      keyField2: "tk",
                                                                    });


  const balanceSubmit = () => submit({values,showAlert,resetForm, });

  // confirm before balance add
  const balanceAddConfirm = (data) => {
    showConfirm(
      "Balance added",
      "Are you sure you want to balance added this user?",
      () => balanceSubmit(data),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    },
  ];

  if (isLoading) return <Loading />

  return (
    <section className="pb-20">
      <ReusableCrudPage
        config={balanceConfig}
        title="Add Border Balance"
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(balanceAddConfirm)}
        actions={actions}
        totalText="Total"
        grandTotal={data?.data?.grandTotalTk || 0}
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </section>
  );
};

export default CreateBalance;
