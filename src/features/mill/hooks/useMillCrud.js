import useCrudManager from "../../../hooks/useCrudManager";

import {
  useAddMillMutation,
  useGetUsersMillQuery,
  useUpdateMillMutation,
} from "../millApi";

const useMillCrud = () => {
  const crud = useCrudManager({
    useGetQuery: useGetUsersMillQuery,
    useAddMutation: useAddMillMutation,
    useUpdateMutation: useUpdateMillMutation,
    keyField1: "dailyMill",
    keyField2: "mill",
  });

  return crud;
};

export default useMillCrud;