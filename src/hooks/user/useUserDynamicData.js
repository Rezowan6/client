import { useNavigate } from "react-router-dom";

export const useUserDynamicData = (data, userId) => {
  const navigate = useNavigate();

  const user = data?.data?.users?.find(
    (u) => String(u?.userId) === String(userId)
  );

  return {
    navigate,
    user: user || {},
  };
};