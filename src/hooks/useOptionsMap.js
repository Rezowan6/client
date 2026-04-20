import { useGetUsersQuery } from "../features/users/userApi";

const useOptionsMap = () => {
  const { data: allUser } = useGetUsersQuery();

  const users = allUser?.data?.users || [];

  const optionsMap = {
    users: users.map((u) => ({
      label: u.name,
      value: u._id,
    })),
  };

  return optionsMap;
};

export default useOptionsMap;