import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetUsersIncidentalExpensesQuery } from "../incidentalExpensesApi";
import { useTableActions } from "./../../../hooks/useTableAction";

const DailayEggIncidantal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data = [], isLoading } = useGetUsersIncidentalExpensesQuery();
  const users = data?.data?.users || [];
  const user = users?.find((user) => String(user?.userId) === String(id)) || {};

  const {
    name = "",
    totalEgg = 0,
    totalOtherCost = 0,
    dailyData = [],
    userId = "",
  } = user || {};

  const columns = [
    { key: "day", label: "Day" },
    { key: "egg", label: "Egg" },
    { key: "otherCost", label: "OtherCost" },
  ];

  const actions = useTableActions({
    edit: (item) => {
      navigate("/incidental-cost", {
        state: {
          editDailyData: item,
          userId: userId || id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/incidental-cost")}
        />
      </div>
      <Title title={`Total Egg: ${totalEgg}`} />
      <Title title={`Total OtherCost: ${totalOtherCost}`} />
      <ReusableTable columns={columns} data={dailyData} actions={actions} />
    </>
  );
};

export default DailayEggIncidantal;
