import { useState } from "react";

const useCrudManager = ({
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  keyField1 = "value", // tk / mill / etc
  keyField2 = "value", // tk / mill / etc
}) => {
  const [editId, setEditId] = useState(null);

  const { data, isLoading } = useGetQuery();
  const [addFn] = useAddMutation();
  const [updateFn] = useUpdateMutation();

  const items = data?.data?.users || [];

//   submit
  const submit = async ({ values, showAlert, resetForm }) => {
    try {
      if (!editId) {
        await addFn(values).unwrap();
        showAlert("Success", "Added successfully!");
      } else {
        await updateFn({
          id: editId,
          data: values,
        }).unwrap();

        showAlert("Success", "Updated successfully!");
      }

      resetForm();
      setEditId(null);
    } catch (err) {
      showAlert("Error", err?.data?.message || "Operation failed");
      resetForm();
    }
  };

//   edit
  const editItem = (item, setValues) => {
    setEditId(item.userId);

    setValues({
      userId: item.userId,
      [keyField2]: item[keyField1].map((day)=> day[keyField2]) || 0,
    });
  };

  return {
    data,
    items,
    isLoading,
    editId,
    setEditId,
    submit,
    editItem,
  };
};

export default useCrudManager;
