import Form from "../../components/form/Form";
import Loading from "../../components/loading/Loding";
import Title from "../../components/title/Title";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";

import {
  useAddEggRateMutation,
  useGetEggRateQuery,
} from "../../features/eggRate/eggRateApi";
import { eggRateValidator } from "../../utils/validate/validateData";
import eggRateConfig from "./../../configs/eggRateConfig";

const EggRate = () => {
  const [createEggRate] = useAddEggRateMutation();
  const { data, isLoading } = useGetEggRateQuery();

  const { alertData, showAlert, closeAlert, showConfirm, confirmAction } =
    useAlert();

  const { values, errors, handleChange, resetForm, handleSubmit } = useForm(
    { eggRate: "", soldProduct: "" },
    eggRateValidator,
  );

  const eggRateSubmit = async (values) => {
    try {
      const payload = {};

      if (values.eggRate !== "") {
        payload.eggRate = values.eggRate;
      }

      if (values.soldProduct !== "") {
        payload.soldProduct = values.soldProduct;
      }
      const res = await createEggRate(payload).unwrap();
      showAlert("Success", res?.message || "Egg rate added success!");
      resetForm();
    } catch (error) {
      showAlert("Error", error?.response?.data?.message || "Egg added Failed!");
      resetForm();
    }
  };

  const eggRateConfirm = () => {
    showConfirm("Egg Rate", "Are you sure you want to added egg rate?", () =>
      eggRateSubmit(values),
    );
  };

  if (isLoading) return <Loading />;

  const { eggRate = 0, soldProduct = 0 } = data?.data || {};

  return (
    <div className="mt-32 sm:mt-0">
      <Title title={`Egg Rate: ${eggRate}`} />
      <Title title={`Sold-Product: ${soldProduct}`} />
      <Form
        config={eggRateConfig}
        values={values}
        errors={errors}
        handleChange={handleChange}
        resetForm={resetForm}
        handleSubmit={handleSubmit(eggRateConfirm)}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </div>
  );
};

export default EggRate;
