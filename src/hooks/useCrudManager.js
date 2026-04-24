import { useState } from "react";

const useCrudManager = ({
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  keyField1 = null, // tk / mill / etc
  keyField2 = null,
  keyField3 = null,
  keyField4 = null,
  keyField5 = null,
}) => {
  const [editId, setEditId] = useState(null);

  const queryResult = useGetQuery?.() ?? { data: null, isLoading: false };


  const data = queryResult?.data ?? null;
  const isLoading = queryResult?.isLoading ?? false;
  const isErrors = queryResult?.errors ?? false;

  const addHook = useAddMutation?.();
  const updateHook = useUpdateMutation?.();
  const deleteHook = useDeleteMutation?.();

  const addFn = addHook?.[0];
  const updateFn = updateHook?.[0];
  const deleteFn = deleteHook?.[0];

  const items = data?.data?.users ?? data?.data ?? [];

  //   submit
  const submit = async ({ values, showAlert, resetForm }) => {
    try {
      const payload = { ...values };

      if (!editId) {
        const res = await addFn(payload).unwrap();
        showAlert("Success", res?.message || "Added successfully!");
      } else {
        const res = await updateFn({
          data: payload,
        }).unwrap();

        showAlert("Success", res?.message || "Updated successfully!");
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
      [keyField5]: item[keyField5],

      [keyField2]: baseData.map((day) => day[keyField2]),

      ...(keyField4
        ? {
            [keyField4]: extraData.map((day) => day[keyField4]),
          }
        : {}),
    });
  };

  const deleteItem = async (id, showAlert) => {
    try {
      if (!deleteFn) return;

      let res;

      if (id) {
        // single delete
        res = await deleteFn(id ?? undefined).unwrap();
      } else {
        // reset monthly
        res = await deleteFn().unwrap();
      }

      showAlert("Success", res?.message || "Operation successful");
    } catch (err) {
      showAlert("Error", err?.data?.message || "Operation failed");
    }
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
    deleteItem,
  };
};

export default useCrudManager;
