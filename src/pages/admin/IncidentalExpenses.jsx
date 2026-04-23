import Loading from "../../components/loading/Loding";
import incidentalExpensesConfig from "../../configs/incidentalExpensesConfig.jsx";
import useIncidentalExpenses from "../../features/incidentalExpenses/hooks/useIncidentalExpenses.js";
import ReusableCrudPage from "./../../components/pages/ReusableCrudPage";

const IncidentalExpenses = () => {
  const {
    // state
    selectedUsers,
    values,
    errors,
    alertData,
    isLoading,
    finalData,
    data,
    editId,

    // actions
    handleChange,
    handleSelectUser,
    onSubmit,
    actions,
    quickEggAdd,
    closeAlert,
    confirmAction,
  } = useIncidentalExpenses();
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-20">
        <ReusableCrudPage
          config={incidentalExpensesConfig}
          title="Incidental Expenses"
          link="egg"
          items={finalData}
          values={values}
          editId={editId}
          handleChange={handleChange}
          handleSubmit={onSubmit}
          actions={actions}
          grandTotal={data?.data?.grandTotalOtherCost || 0}
          totalEgg={data?.data?.grandTotalEgg || 0}
          totalText="Total Other Cost"
          errors={errors}
          alertData={alertData}
          closeAlert={closeAlert}
          confirmAction={confirmAction}
          onSelectUser={handleSelectUser}
          selectedUsers={selectedUsers}
          quickAdd={quickEggAdd}
        />
      </div>
    </>
  );
};

export default IncidentalExpenses;
