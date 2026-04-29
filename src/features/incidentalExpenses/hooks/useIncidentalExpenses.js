import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import useOptionsMap from "../../../hooks/useOptionsMap";
import useAlert from "./../../../hooks/useAlert";
import useForm from "./../../../hooks/useForm";

import {
  buildConfirmMessage,
  buildFinalUsersData,
  distributeIncidentalExpense,
  submitSingleIncidentalExpense,
  toggleSelection,
  useDistributeOtherCostMutation,
  useIncidantalCrud,
  validateIncedentalExpenses,
} from "../index";

const useIncidentalExpenses = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const location = useLocation();

  const { users } = useOptionsMap();

  const [distributeOtherCostMutation] = useDistributeOtherCostMutation();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm(
      { userId: "", otherCost: "", egg: "", totalOtherCost: "", day: "" },
      validateIncedentalExpenses,
    );

  const { items, data, isLoading, editId, submit, setEditId } =
    useIncidantalCrud();

  const incidentalExpensesSubmit = async () => {
    if (selectedUsers.length <= 1) {
      return submitSingleIncidentalExpense({
        selectedUsers,
        values,
        submit,
        showAlert,
        resetForm,
        setSelectedUsers,
      });
    }

    if (selectedUsers.length > 1) {
      return distributeIncidentalExpense({
        selectedUsers,
        values,
        distributeOtherCostMutation,
        showAlert,
        resetForm,
        setSelectedUsers,
      });
    }
  };

  // confirm before balance add
  const handleConfirm = (data) => {
    const message = buildConfirmMessage(values, selectedUsers);

    showConfirm("Balance Add", `Are you sure → ${message}?`, () =>
      incidentalExpensesSubmit(data),
    );
  };

  const onSubmit = handleSubmit(handleConfirm);

  // add
  const quickEggAdd = (user, eggValue) => {
    const values = {
      userId: user.userId,
      egg: eggValue,
    };

    showConfirm(
      "Add Egg",
      `Add ${eggValue} egg for ${user.name}?`,

      () =>
        submit({
          values,
          showAlert,
          resetForm,
        }),
    );
  };

  // edit
  useEffect(() => {
    if (location?.state?.editDailyData) {
      const data = location.state.editDailyData;

      setEditId(location.state.userId);

      setValues((prev) => {
        return {
          ...prev,
          userId: location.state.userId,
          ...data,
        };
      });
    }
  }, [location.state, setValues, setEditId]);

  // selete user
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => toggleSelection(prev, userId));
  };

  // finalData
  const finalData = useMemo(
    () => buildFinalUsersData(users, items),
    [users, items],
  );

  return {
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
    quickEggAdd,
    setValues,
    setEditId,
    closeAlert,
    confirmAction,
  };
};

export default useIncidentalExpenses;
