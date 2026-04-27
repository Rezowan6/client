import { useDashboardData } from "../../hooks/useDashboardData";
import { generateDashboardPDF } from "./../../utils/pdf/generateDashboardPDF";
import Title from '../../components/title/Title'

import Loading from './../../components/loading/Loding';

const AdminDashboard = () => {
  
  const { isLoading, users, totals } = useDashboardData();

  const { totalCost, totalEggCost, totalIncidentalCost, totalMill, totalTk } =
    totals;

  if (isLoading) return <Loading />;
  
  return (
    <div className=" bg-cover bg-center bg-fixed min-h-screen rounded-lg shadow-md">
      <div className="text-center pb-8 lg:pb-20">
        <Title title='Monthly Dashboard Repoart' />
      </div>
        <div className="text-cyan-500 flex flex-col mb-4 justify-evenly items-center lg:flex-row">
          <p>Per Meal Expense: {users?.totals?.perMill?.toFixed(2)}</p>
          <p>Egg Rate: {totals?.eggRate?.toFixed(2)}</p>
          <p>Sold Products: {totals?.soldProduct?.toFixed(2)}</p>
        </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-center border rounded-lg">
          <thead>
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
                  className="transition-all text-sm sm:text-base cursor-pointer"
                >
                  <td className="border px-2 sm:px-4 py-2">{index + 1}</td>

                  <td className="border px-2 sm:px-4 py-2">{user.name}</td>

                  <td className="border px-2 sm:px-4 py-2 text-center">
                    {user?.totalMoney.toFixed(2)}
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
                    {user.expense.toFixed(2)}
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
                    {user.balance.toFixed(2)}
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

            <tr className="font-semibold text-cyan-500">
              <td colSpan="2" className="border px-4 py-2 text-center">
                Total
              </td>
              {/* total balance */}
              <td className="border px-4 py-2 text-center">
                {totalTk.toFixed(2)}
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
                {totalCost.toFixed(2)}
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
