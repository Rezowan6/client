import { useState } from "react";

const useCrudManager = ({
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  keyField1 = null, // tk / mill / etc
  keyField2 = null,
  keyField3 = null,
  keyField4 = null,
}) => {
  const [editId, setEditId] = useState(null);

  const queryResult = useGetQuery?.() ?? { data: null, isLoading: false };

  const data = queryResult?.data ?? null;
  const isLoading = queryResult?.isLoading ?? false;
  const isErrors = queryResult?.errors ?? false;

  const addHook = useAddMutation?.();
  const updateHook = useUpdateMutation?.();

  const addFn = addHook?.[0];
  const updateFn = updateHook?.[0];

  const items = data?.data?.users ?? data?.data ?? [];

  //   submit
  const submit = async ({ values, showAlert, resetForm }) => {
    try {
      if (!addFn && !updateFn) {
        throw new Error("No API function provided");
      }
      if (!editId) {
        await addFn(values).unwrap();
        showAlert("Success", "Added successfully!");
      } else {
        await updateFn({
          id: editId,
          data: values,
        }).unwrap();

        showAlert("Success", "Updated successfully!");
        resetForm();
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
    isErrors,
    editId,
    setEditId,
    submit,
    editItem,
  };
};

export default useCrudManager;
