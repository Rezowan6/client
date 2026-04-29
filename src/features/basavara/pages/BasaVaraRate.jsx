import Form from "../../../components/form/Form";
import Loading from "../../../components/loading/Loding"
import useAlert from "../../../hooks/useAlert";
import useForm from "../../../hooks/useForm";
import { basaVaraRateValidator } from "../../../utils/validate/validateData";
import basaVaraRateConfig from "./../configs/basaVaraRateConfig";
import useCrudManager from './../../../hooks/useCrudManager';
import { useAddBasaVaraRateMutation, useGetUsersBasaVaraRateQuery, useUpdateBasaVaraRateMutation } from "../basaVaraRateApi";

const BasaVaraRate = () => {
  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const { values, errors, handleChange, handleSubmit, resetForm } =
    useForm({ balance: "" }, basaVaraRateValidator);

    const { data, isLoading, submit,} = useCrudManager({
      useAddMutation: useAddBasaVaraRateMutation,
      useGetQuery: useGetUsersBasaVaraRateQuery,
      useUpdateMutation: useUpdateBasaVaraRateMutation
    })

    console.log(data)

  const handleConfirm = () => {
    showConfirm("BasaVara-Rate", "Are you sure you want to added rate?", () =>
      submit(values, showAlert, resetForm),
    );
  };

  if(isLoading) return <Loading />
  return (
    <div>
      <div className="mt-32 sm:mt-0">
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
