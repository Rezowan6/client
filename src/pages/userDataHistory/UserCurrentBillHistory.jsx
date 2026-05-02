import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { currentBillColumns } from "../../constants/tableColumns";
import { useGetCurrentBillHistoryQuery } from "../../features/bills/currentBillsApi";
import { useUserBalance } from "../../hooks/useUserBalance";

const UserCurrentBillHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetCurrentBillHistoryQuery();
  const balance = useUserBalance(userBalance);

  const {
    name = "",
    totalCurrentBill = 0,
    currentBillList = [],
  } = balance || {};

  const columns = currentBillColumns;

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Title title={`Total: ${totalCurrentBill}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <ReusableTable
        title="Current Bill History"
        columns={columns}
        data={currentBillList || []}
        tableAction={false}
      />
    </>
  );
};

export default UserCurrentBillHistory;
