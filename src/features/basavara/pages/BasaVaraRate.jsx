import Form from "../../../components/form/Form";
import Loading from "../../../components/loading/Loding";
import useAlert from "../../../hooks/useAlert";
import useForm from "../../../hooks/useForm";
import { basaVaraRateValidator } from "../../../utils/validate/validateData";
import {
  useAddBasaVaraRateMutation,
  useGetUsersBasaVaraRateQuery,
  useUpdateBasaVaraRateMutation,
} from "../basaVaraRateApi";
import EditBtn from "./../../../components/Button/EditBtn";
import Title from "./../../../components/title/Title";
import useCrudManager from "./../../../hooks/useCrudManager";
import basaVaraRateFunc from "./../configs/basaVaraRateConfig";

const BasaVaraRate = () => {
  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm({ balance1: "", balance2: "" }, basaVaraRateValidator);
  const {
    items = [],
    setEditId,
    editId,
    isLoading,
    submit,
  } = useCrudManager({
    useAddMutation: useAddBasaVaraRateMutation,
    useGetQuery: useGetUsersBasaVaraRateQuery,
    useUpdateMutation: useUpdateBasaVaraRateMutation,
  });

  const basaVaraRateConfig = basaVaraRateFunc(editId);

  const handleConfirm = () => {
    const payload = {
      basaVaraRate: [Number(values.balance1), Number(values.balance2)],
    };
    showConfirm("BasaVara-Rate", "Are you sure you want to added rate?", () =>
      submit({ values: payload, showAlert, resetForm }),
    );
  };

  const editRate = (rates) => {
    setEditId(rates || true);
    setValues((prev) => ({
      ...prev,
      balance1: rates[0],
      balance2: rates[1],
    }));
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Title title="Mass Malik" />
      <div className="mt-6 md:mt-0">
        <div className="flex justify-evenly lg:justify-start gap-4">
          {items?.basaVaraRate?.map((rate, i) => {
            return (
              <div
                key={i}
                className="px-10 py-3 shadow-glow bg-emerald-800/50 hover:bg-emerald-800/60 rounded-md cursor-pointer"
              >
                {"Rate"}: {rate}
                <button onClick={() => editRate(items?.basaVaraRate || [])}>
                  <EditBtn action="edit" />
                </button>
              </div>
            );
          })}
        </div>
        <Form
          config={basaVaraRateConfig}
          values={values}
          errors={errors}
          handleChange={handleChange}
          resetForm={resetForm}
          handleSubmit={handleSubmit(handleConfirm)}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
        />
      </div>
    </>
  );
};

export default BasaVaraRate;
