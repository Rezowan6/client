import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Loading from "../../components/loading/Loding";
import ReusableTable from "../../components/table/ReusableTable";
import Title from "../../components/title/Title";
import { useGetCurrentBillHistoryQuery } from "../../features/bills/currentBillsApi";
import { getLocalUser } from './../../utils/localStorage/localStorage';

const UserCurrentBill = () => {
  const navigate = useNavigate();
  const user = getLocalUser();
  const safeUser = user || {};
  const { _id = "" } = safeUser;

  const { data: userBill, isLoading } = useGetCurrentBillHistoryQuery();

  const balance =
    userBill?.data?.users?.find(
      (user) => String(user?.userId) === String(_id),
    ) || {};
  const { name="", totalCurrentBill=0, currentBillList=[] } = balance || {};

  const columns = [
    { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString("en-BD",) },
    { key: "balance", label: "Balance" },
  ];

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/profile")} />
      </div>
      <Title title={`Total: ${totalCurrentBill}`} />
      <ReusableTable
        columns={columns}
        data={currentBillList || []}
        tableAction={false}
      />
    </>
  );
};

export default UserCurrentBill;
