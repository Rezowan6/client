import { useGetUsersBasaVaraQuery } from "../features/basavara/basaVaraApi";
import { useGetCurrentBillQuery } from "../features/bills/currentBillsApi";
import { useGetKhalaBillQuery } from "../features/khalaBill/khalaBillApi";
import { getSafeUser } from "../utils/localStorage/localStorage";
import { useDashboardData } from "./useDashboardData";
import { useUserBalance } from "./useUserBalance";

export const useUserDashboard = () => {
  const { name = "", email = "", role = "", _id = "" } = getSafeUser();

  const { users, isLoading: userDataLoading } = useDashboardData();
  const { data: usersBasaVara, isLoading: basaVaraLoading } =
    useGetUsersBasaVaraQuery();
  const { data: userKhalaBill, isLoading: khalaBillLoading } =
    useGetKhalaBillQuery();
  const { data: userCurrentBill, isLoading: currentBillLoading } =
    useGetCurrentBillQuery();

  const isLoading =
    userDataLoading ||
    basaVaraLoading ||
    khalaBillLoading ||
    currentBillLoading;

  const userData =
    users?.usersData?.find((u) => String(u?.id) === String(_id)) || {};

  const userBasaVara = useUserBalance(usersBasaVara) || {};

  const khalaBill = useUserBalance(userKhalaBill) || {};

  const currentBill = useUserBalance(userCurrentBill) || {};

  const {
    balance = 0,
    eggCost = 0,
    incidentalCost = 0,
    expense = 0,
    totalMill = 0,
    totalMoney = 0,
  } = userData || {};

  const { isPaid: basaVaraBill = "unpaid" } = userBasaVara || {};
  const { isPaid: khalaBillPaid = "unpaid" } = khalaBill || {};
  const { isPaid: currentBillPaid = "unpaid" } = currentBill || {};

  const dashboardCards = [
    {
      title: "Balance",
      value: totalMoney,
      link: "/user/balance/history",
      actionText: "View History",
      type: "money",
    },
    {
      title: "Total Mill",
      value: totalMill,
      link: "/user/mill/history",
      actionText: "View History",
    },
    { title: "Egg Cost", value: eggCost },
    {
      title: "Incidental Cost",
      value: incidentalCost,
      link: "/user/incidantal/history",
      actionText: "View History",
      type: "money",
    },
    { title: "Total Cost", value: expense, type: "money" },
    {
      title: "Remaining Balance",
      value: balance,
      type: "money",
      conditionalColor: balance > 0,
    },
    {
      title: "Basa Vara",
      value: basaVaraBill,
      link: "/user/basaVara/history",
      actionText: "View History",
      conditionalColor: basaVaraBill === "paid",
    },
    {
      title: "Khala Bill",
      value: khalaBillPaid,
      link: "/user/khalaBill/history",
      actionText: "View History",
      conditionalColor: khalaBillPaid === "paid",
    },
    {
      title: "Current Bill",
      value: currentBillPaid,
      link: "/user/currentBill/history",
      actionText: "View History",
      type: "money",
      conditionalColor: currentBillPaid === "paid",
    },
  ];

  return {
    isLoading,
    name,
    email,
    role,
    dashboardCards,
  };
};
