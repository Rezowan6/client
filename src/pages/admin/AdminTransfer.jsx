import { useNavigate } from 'react-router-dom';

import Button from "../../components/Button/Button";
import FieldRenderer from "../../components/form/FieldRenderer";
import Title from "../../components/title/Title";
import adminTransferConfig from "../../configs/adminTransferConfig";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import useOptionsMap from "../../hooks/useOptionsMap";
import { adminTransfer } from "../../services/admin/adminService";
import { validateRole } from "../../utils/validate/validateData";
import AlertPopup from "./../../components/alertPopup/AlertPopup";

const AdminTransfer = () => {
  const navigate = useNavigate();
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    { userId: "", role: "" },
    validateRole,
  );

  const transferAdmin = async (data) => {
    try {
      const res = await adminTransfer(data);
      showAlert("Seccess", res.data.message || "Transfer successfull");
      resetForm();
      navigate("/profile");
    } catch (error) {
      showAlert("Error", error.response.data.message || "Operation failed");
    }
  };

  const transferconfirm = (value) => {
    showConfirm(
      "Tranfer Admin",
      "Are you sure you want to transfer admin?",
      () => transferAdmin(value),
    );
  };
  const optionsMap = useOptionsMap();
  return (
    <div
      className={`flex flex-col justify-center items-center min-h-[90vh] sm:min-h-[90vh]`}
    >
      {/* <Title title="Transfer Admin" /> */}
      <div className="shadow-[0_0_50px_#0ef] p-10 rounded-2xl">
        <form className="flex flex-col justify-center items-center gap-4">
            <p className="pb-2 mb-2 lg:mb-6 text-[#0ef] text-2xl font-bold">Transfer Admin</p>
          {adminTransferConfig.form.fields.map((field) => {
            return (
              <FieldRenderer
                key={field.name}
                field={field}
                values={values}
                handleChange={handleChange}
                errors={errors}
                optionsMap={optionsMap}
              />
            );
          })}

          <Button
            type="button"
            text="submit"
            onclickHandle={handleSubmit(() => transferconfirm(values))}
          />
        </form>
      </div>

      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default AdminTransfer;
