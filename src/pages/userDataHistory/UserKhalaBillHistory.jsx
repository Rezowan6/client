import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { khalaBillColumns } from "../../constants/tableColumns";
import { useUserBalance } from "../../hooks/useUserBalance";
import { useGetKhalaBillHistoryQuery } from "../../features/khalaBill/khalaBillApi";

const UserKhalaBillHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetKhalaBillHistoryQuery();
  const balance = useUserBalance(userBalance);

  const {
    name = "",
    totalKhalaBill = 0,
    khalaBillList = [],
  } = balance || {};

  const columns = khalaBillColumns;

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <Title title={`Total: ${totalKhalaBill}`} />
      <ReusableTable
        columns={columns}
        data={khalaBillList || []}
        tableAction={false}
      />
    </>
  );
};

export default UserKhalaBillHistory;
