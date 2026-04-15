import { useGetUsersBalanceQuery } from "../../features/balance/balanceApi";
import { useGetUsersCostQuery } from "../../features/cost/costApi";
import { useGetUsersMillQuery } from "../../features/mill/millApi";
import { useGetUsersQuery } from "../../features/users/userApi";
import { generateDashboardPDF } from "../../utils/pdf/generateDashboardPDF";

const AdminDashboard = () => {
  const { data: allUsers, isLoading } = useGetUsersQuery();
  const { data: usersBalance } = useGetUsersBalanceQuery();
  const { data: usersCost } = useGetUsersCostQuery();
  const { data: usersMill } = useGetUsersMillQuery();

  const totalTk = Number(usersBalance?.data?.grandTotalTk);
  const totalCost = Number(usersCost?.data?.grandTotalCost);
  const totalMill = Number(usersMill?.data?.grandTotalMill);
  const remainingTotalBalance = totalTk - totalCost;
  const perMill = totalMill > 0 ? totalCost / totalMill : 0;

  // merged user for pdf
  const mergedStudents =
    allUsers?.data?.users?.map((user) => {
      // balance match
      const matchedBalance = usersBalance?.data?.users?.find(
        (bUser) => bUser.userId === user._id,
      );

      // mill match
      const matchedMill = usersMill?.data?.users?.find(
        (millUser) => millUser.userId === user._id,
      );

      const userTk = matchedBalance?.totalTk || 0;
      const userMill = matchedMill?.totalMill || 0;

      // expense
      const expense = userMill * perMill;

      // balance
      const balance = userTk - expense;

      return {
        id: user._id,
        name: user.name,
        totalMoney: userTk,
        totalMill: userMill,
        expense,
        balance,
      };
    }) || [];

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  // console.log(allUsers);
  return (
    <div className="bg-cover bg-center bg-fixed p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-[#1E1E2F]/90 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center">
        Student Dashboard
      </h2>
      {/* Totals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg sm:text-xl font-medium text-center">
        <h3 className="text-teal-600 dark:text-teal-400 break-words">
          Total Money: {totalTk.toFixed(2)} ৳
        </h3>
        <h3 className="text-red-600 dark:text-red-400 break-words">
          Total Expenses: {totalCost.toFixed(2)} ৳
        </h3>
        <h3 className="text-purple-600 dark:text-purple-400 break-words">
          Total Meal: {totalMill.toFixed(2)}
        </h3>
        <h3 className="monthlyViewHeader break-words">
          Per Meal Expense: {perMill.toFixed(2)} ৳
        </h3>
      </div>

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
            {allUsers?.data?.users?.map((user, index) => {
              const matchedBalance = usersBalance?.data?.users?.find(
                (bUser) => bUser.userId === user._id,
              );

              // mill match
              const matchedMill = usersMill?.data?.users?.find(
                (millUser) => millUser.userId === user._id,
              );

              const userTk = matchedBalance?.totalTk || 0;

              const userMill = matchedMill?.totalMill || 0;

              // expense
              const expense = userMill * perMill;

              // balance
              const balance = userTk - expense;

              return (
                <tr
                  key={user._id || index}
                  className="hover:bg-teal-100 dark:hover:bg-teal-600/30 transition-all text-sm sm:text-base cursor-pointer"
                >
                  <td className="border px-2 sm:px-4 py-2">{index + 1}</td>

                  <td className="border px-2 sm:px-4 py-2">{user.name}</td>

                  <td className="border px-2 sm:px-4 py-2 text-center">
                    ৳{userTk.toFixed(2)}
                  </td>

                  <td className="border px-2 sm:px-4 py-2 text-center">
                    {userMill}
                  </td>

                  {/* Expense */}
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    ৳{expense.toFixed(2)}
                  </td>

                  {/*  Balance with Color */}
                  <td
                    className={`border px-2 sm:px-4 py-2 text-center font-medium
                    ${
                      balance > 0
                        ? "text-green-600 dark:text-green-400"
                        : balance < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500"
                    }`}
                  >
                    ৳{balance.toFixed(2)}
                  </td>

                  <td
                    className={`border px-2 sm:px-4 py-2 text-center font-medium
                    ${
                      balance > 0
                        ? "text-green-600 dark:text-green-400"
                        : balance < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500"
                    }`}
                  >
                    {balance > 0 ? "Receive" : balance < 0 ? "Pay" : "-"}
                  </td>
                </tr>
              );
            })}

            <tr className="font-semibold bg-teal-50 dark:bg-teal-700/20">
              <td colSpan="2" className="border px-4 py-2 text-center">
                Total
              </td>

              <td className="border px-4 py-2 text-center">
                ৳{totalTk.toFixed(2)}
              </td>

              <td className="border px-4 py-2 text-center">{totalMill}</td>

              <td className="border px-4 py-2 text-center">
                ৳{totalCost.toFixed(2)}
              </td>

              <td
                className={`border px-4 py-2 text-center font-medium
                    ${totalCost > 0 ? "text-green-600" : "text-red-600"}`}
              >
                ৳{remainingTotalBalance.toFixed(2)}
              </td>

              <td></td>
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
              students: mergedStudents,
              totalMoney: totalTk,
              totalExpenses: totalCost,
              totalMeal: totalMill,
              expensePerMeal: perMill,
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
