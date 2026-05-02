import { useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetKhalaBillHistoryQuery } from "../khalaBillApi";
import { useTableActions } from "./../../../hooks/useTableAction";
import { useUserDynamicData } from "./../../../hooks/user/useUserDynamicData";
import { khalaBillColumns } from './../../../constants/tableColumns';

const MonthlyKhalaBill = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetKhalaBillHistoryQuery();

  const { user: monthlyKhalaBill, navigate } = useUserDynamicData(data, id);

  const {
    name: userName = "",
    totalKhalaBill = 0,
    khalaBillList: userBillList = [],
  } = monthlyKhalaBill || {};

  const columns = khalaBillColumns

  const actions = useTableActions({
    edit: (item) => {
      navigate("/khala-bill", {
        state: {
          editBill: item,
          userId: id || monthlyKhalaBill?._id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${userName}`} />
        <Title title={`Total: ${totalKhalaBill}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/khala-bill")}
        />
      </div>
      <ReusableTable columns={columns} data={userBillList} actions={actions} />
    </>
  );
};

export default MonthlyKhalaBill;
