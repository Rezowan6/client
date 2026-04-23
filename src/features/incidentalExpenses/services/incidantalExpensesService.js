// single user submit
export const submitSingleIncidentalExpense = ({
  selectedUsers,
  values,
  submit,
  showAlert,
  resetForm,
  setSelectedUsers,
}) => {
  const payload = {
    userId: selectedUsers[0] || values?.userId,
    otherCost: values.otherCost,
    egg: values.egg,
  };

  submit({
    values: payload,
    showAlert,
    resetForm,
  });

  setSelectedUsers([]);
};

// multi user submit
export const distributeIncidentalExpense = async ({
  selectedUsers,
  values,
  distributeOtherCostMutation,
  showAlert,
  resetForm,
  setSelectedUsers,
}) => {
  if (!values.totalOtherCost) {
    return showAlert("Error", "Enter total cost first");
  }

  try {
    await distributeOtherCostMutation({
      userIds: selectedUsers,
      totalOtherCost: Number(values.totalOtherCost),
    }).unwrap();

    showAlert("Success", "Cost distributed successfully");
  } catch (error) {
    showAlert("Error", error?.data?.message || "Distribution failed");
  } finally {
    resetForm();
    setSelectedUsers([]);
  }
};
