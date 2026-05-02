import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { mealColumns } from "../../constants/tableColumns";
import { useGetUsersMillQuery } from "../../features/mill/millApi";
import { useUserBalance } from "../../hooks/useUserBalance";

const UserMealHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetUsersMillQuery();

  const balance = useUserBalance(userBalance);

  const { name = "", totalMill = 0, dailyMill = [] } = balance || {};

  const columns = mealColumns;

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Title title={`Total: ${totalMill}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <ReusableTable
        title="Meal History"
        columns={columns}
        data={dailyMill || []}
        tableAction={false}
      />
    </>
  );
};

export default UserMealHistory;
