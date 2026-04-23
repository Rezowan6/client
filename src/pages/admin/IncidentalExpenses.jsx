import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import EditBtn from "../../components/Button/EditBtn";
import Loading from "../../components/loading/Loding";
import incidentalExpensesConfig from "../../configs/incidentalExpensesConfig.jsx";
import {
  useAddIncidentalExpensesMutation,
  useDistributeOtherCostMutation,
  useGetUsersIncidentalExpensesQuery,
  useUpdateIncidentalExpensesMutation,
} from "../../features/incidentalExpenses/incidentalExpensesApi";
import useAlert from "../../hooks/useAlert";
import useCrudManager from "../../hooks/useCrudManager";
import useForm from "../../hooks/useForm";
import useOptionsMap from "../../hooks/useOptionsMap.js";
import { validateIncedentalExpenses } from "../../utils/validate/validateData";
import ReusableCrudPage from "./../../components/pages/ReusableCrudPage";
import { useTableActions } from "../../utils/tableAction/useTableAction.jsx";

const IncidentalExpenses = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const location = useLocation();

  const [distributeOtherCostMutation] = useDistributeOtherCostMutation();

  const { users } = useOptionsMap();

  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();

  const { values, setValues, errors, handleChange, handleSubmit, resetForm } =
    useForm(
      { userId: "", otherCost: "", egg: "", totalOtherCost: "" },
      validateIncedentalExpenses,
    );

  const { items, data, isLoading, editId, submit, editItem, setEditId } =
    useCrudManager({
      useGetQuery: useGetUsersIncidentalExpensesQuery,
      useAddMutation: useAddIncidentalExpensesMutation,
      useUpdateMutation: useUpdateIncidentalExpensesMutation,
    });

  const incidentalExpensesSubmit = async () => {
    // single user add
    if (selectedUsers.length === 1 || !selectedUsers.length) {
      const payload = {
        userId: selectedUsers[0],
        otherCost: values.otherCost,
        egg: values.egg,
      };
      submit({
        values: payload,
        showAlert,
        resetForm,
      });
      setSelectedUsers([]);
    } else if (selectedUsers.length > 1) {
      if (selectedUsers.length === 0) {
        return showAlert("Error", "Select at least one user");
      }
      if (!values.totalOtherCost) {
        return showAlert("Error", "Enter total cost first");
      }

      try {
        await distributeOtherCostMutation({
          userIds: selectedUsers,
          totalOtherCost: Number(values.totalOtherCost),
        }).unwrap();

        showAlert("Success", "Cost distributed successfully");

        resetForm();
        setSelectedUsers([]);
      } catch (error) {
        // console.log(error.data.message)
        showAlert("Error", error?.data?.message || "Distribution failed");
        resetForm();
        setSelectedUsers([]);
      }
    }
  };

  // confirm before balance add
  const incidentalExpensesAddConfirm = (data) => {
    const { egg, otherCost, totalOtherCost } = values;
    const users = selectedUsers.length;

    let messageParts = [];

    if (egg) {
      messageParts.push(`Egg: ${egg}`);
    }

    if (otherCost) {
      messageParts.push(`Other Cost: ${otherCost}`);
    }

    if (totalOtherCost) {
      messageParts.push(
        `Total Cost: ${totalOtherCost} and Total Border: ${users}`,
      );
    }

    const message =
      messageParts.length > 0 ? messageParts.join(", ") : "No value entered";

    showConfirm("Balance Add", `Are you sure to add → ${message} ?`, () =>
      incidentalExpensesSubmit(data),
    );
  };

  const actions = useTableActions(editItem, setValues)

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
    if (location.state?.editDailyData) {
      const { egg, otherCost } = location.state.editDailyData;
      setEditId(location.state.userId);
      setValues({
        userId: location.state.userId,
        egg: egg,
        otherCost: otherCost,
      });
    }
  }, [location.state, setValues, setEditId]);

  //
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // first items ke map banai
  const itemsMap = items.reduce((acc, item) => {
    acc[item.userId] = item;
    return acc;
  }, {});

  // then merge
  const finalData = users.map((user) => {
    const matchedItem = itemsMap[user.value];

    return {
      userId: user.value,
      name: user.name,

      dailyData: matchedItem?.dailyData || [],

      totalEgg: matchedItem?.totalEgg || 0,

      totalOtherCost: matchedItem?.totalOtherCost || 0,
    };
  });

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
          handleSubmit={handleSubmit(incidentalExpensesAddConfirm)}
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
