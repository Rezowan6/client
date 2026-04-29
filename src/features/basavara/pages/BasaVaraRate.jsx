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
import useCrudManager from "./../../../hooks/useCrudManager";
import basaVaraRateConfig from "./../configs/basaVaraRateConfig";

const BasaVaraRate = () => {
  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { balance1: "", balance2: "" },
    basaVaraRateValidator,
  );

  const { isLoading, submit } = useCrudManager({
    useAddMutation: useAddBasaVaraRateMutation,
    useGetQuery: useGetUsersBasaVaraRateQuery,
    useUpdateMutation: useUpdateBasaVaraRateMutation,
  });

  const handleConfirm = () => {
    const payload = {
      basaVaraRate: [Number(values.balance1), Number(values.balance2)],
    };
    showConfirm("BasaVara-Rate", "Are you sure you want to added rate?", () =>
      submit({ values: payload, showAlert, resetForm }),
    );
  };

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mt-32 md:mt-0">
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
    </div>
  );
};

export default BasaVaraRate;
