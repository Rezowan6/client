import { getUserBalance } from "../utils/user/getUserBalance";
import { getSafeUser } from "../utils/localStorage/localStorage";

export const useUserBalance = (userBalance) => {
  const { _id } = getSafeUser();

  return getUserBalance(userBalance, _id);
};