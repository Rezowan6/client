import useCrudManager from "../../../hooks/useCrudManager";

import {
  useAddIncidentalExpensesMutation,
  useGetUsersIncidentalExpensesQuery,
  useUpdateIncidentalExpensesMutation,
} from "../incidentalExpensesApi";

export const useIncidantalCrud = () => {
  const crud = useCrudManager({
    useGetQuery: useGetUsersIncidentalExpensesQuery,
    useAddMutation: useAddIncidentalExpensesMutation,
    useUpdateMutation: useUpdateIncidentalExpensesMutation,
  });

  return crud;
};
