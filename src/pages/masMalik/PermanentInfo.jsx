// internal import
import EditBtn from "../../components/Button/EditBtn";
import ReusableCrudPage from "../../components/pages/ReusableCrudPage";
import { useAddPermanentInfoMutation, useGetUsersPermanentInfoQuery, useUpdatePermanentInfoMutation } from "../../features/permanentInfo/permanentInfoApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import { validatePermanentInfo } from "../../utils/validate/validateData";
import permanentInfoConfig from "./../../configs/parmanentInfoConfig";

const PermanentInfo = () => {
    const { alertData, showAlert, showConfirm, closeAlert, confirmAction } = useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } = useForm({ userId: "", location: "", mobileNumber: "", department:"",semester:""  }, validatePermanentInfo);

  const { items, data, isLoading, editId, submit, editItem } = useCrudManager({
                                                                      useGetQuery: useGetUsersPermanentInfoQuery,
                                                                      useAddMutation: useAddPermanentInfoMutation,
                                                                      useUpdateMutation: useUpdatePermanentInfoMutation,
                                                                      keyField1: "dailyTk",
                                                                      keyField2: "tk",
                                                                    });


  const permanentInfoSubmit = () => submit({values,showAlert,resetForm, });

  // confirm before permanentInfo add
  const permanentInfoAddConfirm = (data) => {
    showConfirm(
      "PermanentInfo added",
      "Are you sure you want to permanentInfo added this user?",
      () => permanentInfoSubmit(data),
    );
  };

  const actions = [
    {
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  console.log(data)
  return (
    <>
      <ReusableCrudPage
        config={permanentInfoConfig}
        title='Add Your Permanent Information'
        items={items}
        values={values}
        editId={editId}
        handleChange={handleChange}
        handleSubmit={handleSubmit(permanentInfoAddConfirm)}
        actions={actions}
        totalText="Total"
        grandTotal={data?.data?.grandTotalTk || 0}
        errors={errors}
        alertData={alertData}
        closeAlert={closeAlert}
        confirmAction={confirmAction}
      />
    </>
  );
};

export default PermanentInfo;
