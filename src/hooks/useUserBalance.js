import { getUserBalance } from "../utils/balance/balance";
import { getSafeUser } from "../utils/localStorage/localStorage";

export const useUserBalance = (userBalance) => {
  const { _id } = getSafeUser();

  return getUserBalance(userBalance, _id);
};