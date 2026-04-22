import { useEffect, useMemo } from "react";
import { useGetUsersQuery } from "../features/users/userApi";
import Loading from "./../components/loading/Loding";

const useOptionsMap = () => {
  const { data: allUser } = useGetUsersQuery();

  const users = useMemo(() => {
    return allUser?.data?.users || [];
  }, [allUser]);

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

  const optionsMap = useMemo(() => ({
    users: users.map((u) => ({
      name: u?.name,
      value: u?._id,
      role: u?.role,
    })),
  }), [users]);

  return optionsMap;
};

export default useOptionsMap;
