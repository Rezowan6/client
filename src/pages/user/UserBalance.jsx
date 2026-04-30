import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { useGetUsersBalanceQuery } from "../../features/balance/balanceApi";
import { getLocalUser } from "../../utils/localStorage/localStorage";

const UserBalance = () => {
  const navigate = useNavigate();
  const user = getLocalUser();
  const safeUser = user || {};
  const { _id = "" } = safeUser;

  const { data: userBalance, isLoading } = useGetUsersBalanceQuery();

  const balance =
    userBalance?.data?.users?.find(
      (user) => String(user?.userId) === String(_id),
    ) || {};

  const { name, totalTk, dailyTk } = balance;

  const columns = [
    { key: "day", label: "Day" },
    { key: "balance", label: "Balance" },
  ];
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/profile")}
        />
      </div>
      <Title title={`Total: ${totalTk}`} />
      <ReusableTable columns={columns} data={dailyTk} tableAction={false} />
    </>
  );
};

export default UserBalance;
