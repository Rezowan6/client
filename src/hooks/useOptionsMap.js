import { useEffect } from "react";
import { useGetUsersQuery } from "../features/users/userApi";

const useOptionsMap = () => {
  const { data: allUser } = useGetUsersQuery();

  const users = allUser?.data?.users || [];

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (!localUser) return;

    // find current user in latest users list
    const updatedUser = users.find((u) => u._id === localUser._id);

    if (updatedUser && updatedUser.role !== localUser.role) {
      // update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // optional reload UI
      window.location.reload();
    }
  }, [users]);

  const optionsMap = {
    users: users.map((u) => ({
      name: u?.name,
      value: u?._id,
      role: u?.role,
    })),
  };

  return optionsMap;
};

export default useOptionsMap;
