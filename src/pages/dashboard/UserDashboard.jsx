import Loading from "../../components/loading/Loding";
import { useGetUsersBasaVaraQuery } from "../../features/basavara/basaVaraApi";
import { useGetCurrentBillQuery } from "../../features/bills/currentBillsApi";
import { useGetKhalaBillQuery } from "../../features/khalaBill/khalaBillApi";
import { useDashboardData } from "../../hooks/useDashboardData";

import profilImg from "../../assets/images/app.png";
import { getLocalUser } from "../../utils/localStorage/localStorage";

const UserDashboard = () => {
  const user = getLocalUser();

  const safeUser = user || {};
  const { name="", email="", role="", _id="" } = safeUser;

  const { isLoading, users } = useDashboardData();
  const { data: usersBasaVara } = useGetUsersBasaVaraQuery();
  const { data: userKhalaBill } = useGetKhalaBillQuery();
  const { data: userCurrentill } = useGetCurrentBillQuery();

  const userData =
    users?.usersData?.find((user) => String(user?.id) === String(_id)) || {};
  const userBasaVara =
    usersBasaVara?.data?.users?.find((user) => user?.userId === _id) || {};
  const khalaBill =
    userKhalaBill?.data?.users?.find((user) => user?.userId === _id) || {};
  const currentBill =
    userCurrentill?.data?.users?.find((user) => user?.userId === _id) || {};

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

  if (isLoading || !users?.usersData?.length) return <Loading />;

  return (
    <div className="max-w-full lg:max-w-4xl mx-auto pt-6">
      {/* Header */}
      <div className="bg-gray-700 shadow rounded-2xl p-6 flex items-center gap-6">
        <img
          src={profilImg}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p>{email}</p>
          <p className="text-sm">{role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-700 p-4 rounded-xl shadow">
          <p>Balance</p>
          <h3 className="text-lg font-bold">{totalMoney.toFixed(2)}</h3>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl shadow">
          <p>Total Mill</p>
          <h3 className="text-lg font-bold">{totalMill}</h3>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl shadow">
          <p>Egg Cost</p>
          <h3 className="text-lg font-bold">{eggCost}</h3>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl shadow">
          <p>Incidantal Cost</p>
          <h3 className="text-lg font-bold">{incidentalCost.toFixed(2)}</h3>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl shadow">
          <p>Total Cost</p>
          <h3 className="text-lg font-bold">{expense.toFixed(2)}</h3>
        </div>

        <div
          className={`bg-gray-700 ${balance > 0 ? "text-green-500" : "text-rose-500"} p-4 rounded-xl shadow`}
        >
          <p>Remaining Balance</p>
          <h3 className="text-lg font-bold">{balance.toFixed(2)}</h3>
        </div>

        <div
          className={`bg-gray-700 ${basaVaraBill === "paid" ? "text-green-500" : "text-rose-500"} p-4 rounded-xl shadow`}
        >
          <p>Basa Vara</p>
          <h3 className="text-lg font-bold">{basaVaraBill}</h3>
        </div>

        <div
          className={`bg-gray-700 ${khalaBillPaid === "paid" ? "text-green-500" : "text-rose-500"} p-4 rounded-xl shadow`}
        >
          <p>Khala Bill</p>
          <h3 className="text-lg font-bold">{khalaBillPaid}</h3>
        </div>

        <div
          className={`bg-gray-700 ${currentBillPaid === "paid" ? "text-green-500" : "text-rose-500"} p-4 rounded-xl shadow`}
        >
          <p>Current Bill</p>
          <h3 className="text-lg font-bold">{currentBillPaid}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="bg-gray-700 shadow rounded-2xl p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Profile Details</h3>

        <div className="space-y-2">
          <p>{/* 📍 Address: {user?.address} */}</p>
          <p>{/* 📅 Joined: {user?.createdAt} */}</p>
          <p>{/* 📞 Phone: {user?.phone} */}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
