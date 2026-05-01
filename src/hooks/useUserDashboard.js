import { getLocalUser } from "../utils/localStorage/localStorage";
import { useDashboardData } from './useDashboardData';
import { useGetUsersBasaVaraQuery } from '../features/basavara/basaVaraApi';
import { useGetKhalaBillQuery } from '../features/khalaBill/khalaBillApi';
import { useGetCurrentBillQuery } from '../features/bills/currentBillsApi';


export const useUserDashboard = () => {
  const user = getLocalUser() || {};
  const { name = "", email = "", role = "", _id = "" } = user;

  const { isLoading, users } = useDashboardData();
  const { data: usersBasaVara } = useGetUsersBasaVaraQuery();
  const { data: userKhalaBill } = useGetKhalaBillQuery();
  const { data: userCurrentBill } = useGetCurrentBillQuery();

  const userData =
    users?.usersData?.find((u) => String(u?.id) === String(_id)) || {};

  const userBasaVara =
    usersBasaVara?.data?.users?.find((u) => u?.userId === _id) || {};

  const khalaBill =
    userKhalaBill?.data?.users?.find((u) => u?.userId === _id) || {};

  const currentBill =
    userCurrentBill?.data?.users?.find((u) => u?.userId === _id) || {};

  const {
    balance = 0,
    eggCost = 0,
    incidentalCost = 0,
    expense = 0,
    totalMill = 0,
    totalMoney = 0,
  } = userData;

  const { isPaid: basaVaraBill = "unpaid" } = userBasaVara;
  const { isPaid: khalaBillPaid = "unpaid" } = khalaBill;
  const { isPaid: currentBillPaid = "unpaid" } = currentBill;

  const dashboardCards = [
    {
      title: "Balance",
      value: totalMoney,
      link: "/user/balance",
      actionText: "View History",
      type: "money",
    },
    { title: "Total Mill", value: totalMill },
    { title: "Egg Cost", value: eggCost },
    { title: "Incidental Cost", value: incidentalCost, type: "money" },
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
      conditionalColor: basaVaraBill === "paid",
    },
    {
      title: "Khala Bill",
      value: khalaBillPaid,
      conditionalColor: khalaBillPaid === "paid",
    },
    {
      title: "Current Bill",
      value: currentBillPaid,
      link: "/user/currentBill",
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