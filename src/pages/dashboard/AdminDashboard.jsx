import { useDashboardData } from "../../hooks/useDashboardData";
import { generateDashboardPDF } from "./../../utils/pdf/generateDashboardPDF";

const AdminDashboard = () => {
  const { isLoading, users, totals } = useDashboardData();
  const { totalCost, totalEggCost, totalIncidentalCost, totalMill, totalTk } =
    totals;

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  return (
    <div className=" bg-cover bg-center bg-fixed p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-[#1E1E2F]/90 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        Monthly Dashboard Repoart
      </h2>
      <p className="text-cyan-600">Per Meal Expense: {users?.totals?.perMill?.toFixed(2)}</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center border rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-700/50">
            <tr>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                SL
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Name
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Total Money
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Total Meal
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Egg
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Incidental
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Expenses
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Remaining Balance
              </th>
              <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.usersData?.map((user, index) => {
              return (
                <tr
                  key={user._id || index}
                  className="hover:bg-teal-100 dark:hover:bg-teal-600/30 transition-all text-sm sm:text-base cursor-pointer"
                >
                  <td className="border px-2 sm:px-4 py-2">{index + 1}</td>

                  <td className="border px-2 sm:px-4 py-2">{user.name}</td>

                  <td className="border px-2 sm:px-4 py-2 text-center">
                    ৳{user?.totalMoney.toFixed(2)}
                  </td>
                  {/* mill */}
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    {user?.totalMill}
                  </td>
                  {/* egg */}
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    {user.eggCost}
                  </td>
                  {/* incidental */}
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    {user.incidentalCost}
                  </td>

                  {/* Expense */}
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    ৳{user.expense.toFixed(2)}
                  </td>

                  {/*  Balance with Color */}
                  <td
                    className={`border px-2 sm:px-4 py-2 text-center font-medium
                    ${
                      user?.balance > 0
                        ? "text-green-600 dark:text-green-400"
                        : user?.balance < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500"
                    }`}
                  >
                    ৳{user.balance.toFixed(2)}
                  </td>

                  <td
                    className={`border px-2 sm:px-4 py-2 text-center font-medium
                    ${
                      user?.balance > 0
                        ? "text-green-600 dark:text-green-400"
                        : user?.balance < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500"
                    }`}
                  >
                    {user?.balance > 0
                      ? "Receive"
                      : user?.balance < 0
                        ? "Pay"
                        : "-"}
                  </td>
                </tr>
              );
            })}

            <tr className="font-semibold bg-teal-50 dark:bg-teal-700/20">
              <td colSpan="2" className="border px-4 py-2 text-center">
                Total
              </td>
              {/* total balance */}
              <td className="border px-4 py-2 text-center">
                ৳{totalTk.toFixed(2)}
              </td>
              {/* total mill */}
              <td className="border px-4 py-2 text-center">{totalMill}</td>
              {/* total egg */}
              <td className="border px-4 py-2 text-center">{totalEggCost}</td>
              {/* total incidental */}
              <td className="border px-4 py-2 text-center">
                {totalIncidentalCost}
              </td>
              {/* total expenses */}
              <td className="border px-4 py-2 text-center">
                ৳{totalCost.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PDF Button */}
      <div className="flex justify-end mt-4">
        <button
          className="yesBtn lg:w-52"
          onClick={() =>
            generateDashboardPDF({
              students: users?.usersData,
              totalMoney: totalTk,
              totalExpenses: totalCost,
              totalMeal: totalMill,
              expensePerMeal: users?.totals?.perMill,
              totalEggCost: totalEggCost,
              totalIncidentalCost: totalIncidentalCost,
            })
          }
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
