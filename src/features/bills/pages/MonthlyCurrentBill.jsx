import { useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { currentBillColumns } from "../../../constants/tableColumns";
import { useUserDynamicData } from "../../../hooks/user/useUserDynamicData";
import { useGetCurrentBillHistoryQuery } from "../currentBillsApi";
import { useTableActions } from "./../../../hooks/useTableAction";

const MonthlyCurrentBill = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCurrentBillHistoryQuery();

  const { user: monthlyCurrentBills, navigate } = useUserDynamicData(data, id);
  const {
    name = "",
    totalCurrentBill = 0,
    currentBillList = [],
  } = monthlyCurrentBills || {};

  const columns = currentBillColumns;

  const actions = useTableActions({
    edit: (item) => {
      navigate("/current-bill", {
        state: {
          editBill: item,
          userId: id || userMonthlyData?._id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Title title={`Total: ${totalCurrentBill}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/current-bill")}
        />
      </div>
      <ReusableTable
        columns={columns}
        data={currentBillList}
        actions={actions}
      />
    </>
  );
};

export default MonthlyCurrentBill;
