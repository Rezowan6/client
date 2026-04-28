import { useMemo } from "react";
import { useGetUsersQuery } from "../features/users/userApi";

const useOptionsMap = () => {
  const { data: allUser } = useGetUsersQuery();

  const users = useMemo(() => {
    return allUser?.data?.users || [];
  }, [allUser]);

  const optionsMap = useMemo(
    () => ({
      users: users.map((u) => ({
        name: u?.name,
        value: u?._id,
        role: u?.role,
      })),
    }),
    [users],
  );

  return optionsMap;
};

export default useOptionsMap;
