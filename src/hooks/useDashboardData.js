import { useMemo } from "react";
import { useGetUsersBalanceQuery } from "../features/balance/balanceApi";
import { useGetUsersCostQuery } from "../features/cost/costApi";
import { useGetUsersIncidentalExpensesQuery } from "../features/incidentalExpenses/incidentalExpensesApi";
import { useGetUsersMillQuery } from "../features/mill/millApi";
import { useGetUsersQuery } from "../features/users/userApi";
import { calculateUserFinancials } from "../utils/dashboard/calcDashboard";

export const useDashboardData = () => {
  const { data: usersData, isLoading } = useGetUsersQuery();
  const { data: balanceData } = useGetUsersBalanceQuery();
  const { data: costData } = useGetUsersCostQuery();
  const { data: millData } = useGetUsersMillQuery();
  const { data: incidentalData } = useGetUsersIncidentalExpensesQuery();

  const eggRate = 20;

  const processedUsers = useMemo(() => {
    return calculateUserFinancials({
      users: usersData?.data?.users,
      balanceUsers: balanceData?.data?.users,
      millUsers: millData?.data?.users,
      incidentalUsers: incidentalData?.data?.users,
      grandTotalCost: costData?.data?.grandTotalCost,
      grandTotalMill: millData?.data?.grandTotalMill,
      eggRate,
    });
  }, [
    usersData?.data?.users,
    balanceData?.data?.users,
    millData?.data?.users,
    incidentalData?.data?.users,
    costData?.data?.grandTotalCost,
    millData?.data?.grandTotalMill,
    eggRate,
  ]);

  return {
    isLoading,
    users: processedUsers,

    totals: {
      totalTk: balanceData?.data?.grandTotalTk || 0,
      totalCost: costData?.data?.grandTotalCost || 0,
      totalMill: millData?.data?.grandTotalMill || 0,
      totalEggCost: processedUsers?.totals?.totalEggCost,
      totalIncidentalCost: processedUsers?.totals?.totalIncidentalCost,
    },
  };
};
