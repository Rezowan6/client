import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { useGetUsersBasaVaraHistoryQuery } from "../../features/basavara/basaVaraApi";
import { basaVaraColumns } from "./../../constants/tableColumns";
import { useUserBalance } from "./../../hooks/useUserBalance";

const UserBasaVaraHistory = () => {
  const navigate = useNavigate();

  const { data: userBalance, isLoading } = useGetUsersBasaVaraHistoryQuery();

  const balance = useUserBalance(userBalance);
  const { name = "", totalBasaVara = 0, basaVaraList = [] } = balance || {};

  const columns = basaVaraColumns;

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Title title={`Total: ${totalBasaVara}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <ReusableTable
        title="Basa-vara History"
        columns={columns}
        data={basaVaraList || []}
        tableAction={false}
      />
    </>
  );
};

export default UserBasaVaraHistory;
