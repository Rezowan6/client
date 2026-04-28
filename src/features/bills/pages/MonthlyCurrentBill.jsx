import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetCurrentBillQuery } from "../currentBillsApi";
import { useTableActions } from "./../../../hooks/useTableAction";

const MonthlyCurrentBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetCurrentBillQuery();

  const users = data?.data?.users || [];
  const userMonthlyData = users?.find((user) => user?.userId === id) || {};
  const {
    name: userName = "",
    totalCurrentBill = 0,
    currentBillList: usercurrentBillList = [],
  } = userMonthlyData || {};

  const columns = [
    { key: "date", label: "Date" },
    { key: "currentBill", label: "CurrentBill" },
    { key: "isPaid", label: "Status" },
  ];

  const actions = useTableActions({
    edit: (item) => {
      navigate("/current-bill", {
        state: {
          editCurrentBill: item,
          userId: id || userMonthlyData?._id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${userName}`} />
        <Title title={`Total: ${totalCurrentBill}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/current-bill")}
        />
      </div>
      <ReusableTable
        columns={columns}
        data={usercurrentBillList}
        actions={actions}
      />
    </>
  );
};

export default MonthlyCurrentBill;
