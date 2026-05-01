import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { useGetUsersBalanceQuery } from "../../features/balance/balanceApi";
import { useUserBalance } from "../../hooks/useUserBalance";
import { balanceColumns } from "../../constants/tableColumns";

const UserBalanceHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetUsersBalanceQuery();

  const balance = useUserBalance(userBalance);

  const { name="", totalTk=0, dailyTk=[] } = balance || {};

  const columns = balanceColumns

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <Title title={`Total: ${totalTk}`} />
      <ReusableTable
        columns={columns}
        data={dailyTk || []}
        tableAction={false}
      />
    </>
  );
};

export default UserBalanceHistory;
