import EditBtn from "../../components/Button/EditBtn";
import Form from "../../components/form/Form";
import CostTable from "../../components/table/CostTable";
import {
  useAddCostMutation,
  useGetUsersCostQuery,
  useUpdateCostMutation,
} from "../../features/cost/costApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import { validateCost } from "../../utils/validate/validateData";
import useForm from "./../../hooks/useForm";
import costConfigFunc from './../../configs/costConfig';

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
  
  const costConfig = costConfigFunc({editId});

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="pb-10">
      <div className="text-cyan-500 text-2xl pt-2 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h1>Manager : {adminName}</h1>
        <h2 className="text-xl text-cyan-500 font-bold mb-2">
          Monthly Cost Report
        </h2>
        <p>Total: {totalcost}</p>
      </div>
      <div className="mt-0 sm:-mt-16">
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

      <CostTable columns={columns} data={data?.data} actions={actions} />
    </section>
  );
};

export default CostAdd;
