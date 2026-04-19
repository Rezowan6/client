import EditBtn from "../../components/Button/EditBtn";
import Form from "../../components/form/Form";
import Loading from "../../components/loading/Loding";
import CostTable from "../../components/table/CostTable";
import Title from "../../components/title/Title";
import {
  useAddCostMutation,
  useGetUsersCostQuery,
  useUpdateCostMutation,
} from "../../features/cost/costApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import { validateCost } from "../../utils/validate/validateData";
import costConfigFunc from "./../../configs/costConfig";
import useForm from "./../../hooks/useForm";

const CostAdd = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, resetForm } = useForm(
    { cost: "", desc: "", signature: "" },
    validateCost,
  );

  const { data, editId, isLoading, setEditId, submit } = useCrudManager({
    useGetQuery: useGetUsersCostQuery,
    useAddMutation: useAddCostMutation,
    useUpdateMutation: useUpdateCostMutation,
  });

  const costSubmit = () => submit({ values, showAlert, resetForm });

  const adminName = data?.data?.adminName || "";
  const totalcost = data?.data?.grandTotalCost || 0;

  const costConfig = costConfigFunc({ editId });

  // edit cost
  const editCost = (data) => {
    setEditId(data.day);

    data?.items?.forEach((item) => {
      setValues({
        cost: item.cost,
        desc: item.desc,
        signature: item.signature,
      });
    });
  };
  // confirm before cost add
  const costAddConfirm = (data) => {
    showConfirm(
      "Cost added",
      "Are you sure you want to cost added this month?",
      () => costSubmit(data),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editCost(item, setValues),
    },
  ];
  const columns = [
    { key: "day", label: "Day" },
    { key: "totalCost", label: "Cost" },
    { key: "desc", label: "Desc" },
    { key: "signature", label: "Signature" },
  ];

  if (isLoading) return <Loading />;

  return (
    <section className="pb-10">
      <div className="text-cyan-500 text-2xl flex flex-col items-center justify-between sm:flex-row">
        <Title title={`Manager: ${adminName}`} />
        <p>Total: {totalcost}</p>
      </div>
      <div className="mt-0 sm:-mt-24">
        <Form
          config={costConfig}
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={(e) => {
            e.preventDefault();
            costAddConfirm();
          }}
          resetForm={resetForm}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
        />
      </div>
      <Title title="Monthly Cost Report" />
      <CostTable columns={columns} data={data?.data} actions={actions} />
    </section>
  );
};

export default CostAdd;
