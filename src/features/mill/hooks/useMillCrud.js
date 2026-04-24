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
  });

  return crud;
};

export default useMillCrud;