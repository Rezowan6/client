import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { incidantaExpensesColumns } from "../../constants/tableColumns";
import { useGetUsersIncidentalExpensesQuery } from "../../features/incidentalExpenses/incidentalExpensesApi";
import { useUserBalance } from "../../hooks/useUserBalance";

const UserIncidantalHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetUsersIncidentalExpensesQuery();
  const balance = useUserBalance(userBalance);

  const {
    name = "",
    totalEgg = 0,
    totalOtherCost = 0,
    dailyData = [],
  } = balance || {};

  const columns = incidantaExpensesColumns;

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <div className="flex justify-evenly items-center">
        <Title title={`Total cost: ${totalOtherCost}`} />
        <Title title={`Total Egg: ${totalEgg}`} />
      </div>
      <ReusableTable
        title="Other Cost History"
        columns={columns}
        data={dailyData || []}
        tableAction={false}
      />
    </>
  );
};

export default UserIncidantalHistory;
