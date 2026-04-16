import { useState } from "react";

const useCrudManager = ({
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  keyField1 = "value", // tk / mill / etc
  keyField2 = "value",
  keyField3 = null,
  keyField4 = null,
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
      setEditId(null);
    }
  };

  //   edit
  const editItem = (item, setValues) => {
    setEditId(item.userId);

    const baseData = item[keyField1] || [];

    const extraData = keyField3 ? item[keyField3] || [] : [];

    setValues({
      userId: item.userId,

      [keyField2]: baseData.map((day) => day[keyField2]),

      ...(keyField4
        ? {
            [keyField4]: extraData.map((day) => day[keyField4]),
          }
        : {}),
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
