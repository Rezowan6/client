import EditBtn from "../../components/Button/EditBtn";
import Input from "../../components/Input/Input";
import incidentalExpensesConfig from "../../configs/incidentalExpensesConfig";
import {
  useAddIncidentalExpensesMutation,
  useGetUsersIncidentalExpensesQuery,
  useUpdateIncidentalExpensesMutation,
} from "../../features/incidentalExpenses/incidentalExpensesApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import { validateIncedentalExpenses } from "../../utils/validate/validateData";
import ReusableCrudPage from "./../../components/pages/ReusableCrudPage";

const IncidentalExpenses = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ userId: "", otherCost: "", egg: "", eggRate: "" }, validateIncedentalExpenses);

  const { items, data, isLoading, editId, submit, editItem } = useCrudManager({
                                                              useGetQuery: useGetUsersIncidentalExpensesQuery,
                                                              useAddMutation: useAddIncidentalExpensesMutation,
                                                              useUpdateMutation: useUpdateIncidentalExpensesMutation,
                                                              keyField1: "dailyData",
                                                              keyField2: "otherCost",
                                                              keyField3: "dailyData",
                                                              keyField4: "egg",
                                                            });

  const incidentalExpensesSubmit = () =>
    submit({ values, showAlert, resetForm });

  // confirm before balance add
  const incidentalExpensesAddConfirm = (data) => {
    showConfirm(
      "Balance added",
      "Are you sure you want to balance added this user?",
      () => incidentalExpensesSubmit(data),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    },
  ];

  if (isLoading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="text-white p-6">
      <div className="w-1/2 lg:w-1/4 ">
        <Input label='Per-Egg-Rate' type="number" placeholder="Enter Per-Egg-Rate" />
      </div>
      <ReusableCrudPage
        config={incidentalExpensesConfig}
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(incidentalExpensesAddConfirm)}
        actions={actions}
        grandTotal={data?.data?.grandTotalOtherCost || 0}
        totalEgg = {data?.data?.grandTotalEgg || 0}
        totalText="Total Other Cost"
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </div>
  );
};

export default IncidentalExpenses;
