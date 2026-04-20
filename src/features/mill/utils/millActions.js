export const millAddConfirm = ({
  showConfirm,
  submit,
  values,
  showAlert,
  resetForm,
}) => {
  showConfirm(
    "Mill Added",
    "Are you sure you want to add this mill?",
    () =>
      submit({
        values,
        showAlert,
        resetForm,
      })
  );
};