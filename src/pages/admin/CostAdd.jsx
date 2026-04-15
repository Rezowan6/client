import AlertPopup from "../../components/alertPopup/AlertPopup";
import Button from "../../components/Button/Button";
import EditBtn from "../../components/Button/EditBtn";
import Input from "../../components/Input/Input";
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
const CostAdd = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ cost: "", desc: "", signature: "" }, validateCost);

  const { data, isLoading, setEditId, editId, submit, } = useCrudManager({
    useGetQuery: useGetUsersCostQuery,
    useAddMutation: useAddCostMutation,
    useUpdateMutation: useUpdateCostMutation,
  });

  const costSubmit = () => submit({ values, showAlert, resetForm });

  const adminName = data?.data?.adminName|| "";
  const totalcost = data?.data?.grandTotalCost|| 0;


  // edit cost
const editCost = (data) => {
  console.log(data)
  setEditId(data.day)
  data?.items?.forEach((item) => {
    setValues({cost: item.cost, desc: item.desc, signature: item.signature})
  })
}
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
    <div className="text-white p-6">
      <h1 className="text-cyan-500 text-2xl pb-2">Manager : {adminName}</h1>
      <form onSubmit={handleSubmit(costAddConfirm)}>
        <div className="lg:w-1/3 pb-3">
          <Input
            label="Cost"
            name="cost"
            type="number"
            value={values.cost}
            onChange={handleChange}
            error={errors.cost}
            placeholder="Enter Cost"
          />
          <Input
            label="Desc"
            name="desc"
            type="text"
            value={values.desc}
            onChange={handleChange}
            error={errors.desc}
            placeholder="Enter Cost"
          />
          <Input
            label="Signature"
            name="signature"
            type="text"
            value={values.signature}
            onChange={handleChange}
            error={errors.signature}
            placeholder="Enter Signature"
          />
        </div>
        <Button type="submit" text={editId ? "Update": "submit"} />
      </form>

      <h2 className="text-end text-cyan-500 text-2xl py-3">Total: {totalcost}</h2>

      <CostTable columns={columns} data={data?.data} actions={actions} />

      <AlertPopup
        show={alertData.show}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        autoHide={alertData.autoHide}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default CostAdd;
