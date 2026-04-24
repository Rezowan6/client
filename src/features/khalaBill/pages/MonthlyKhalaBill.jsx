import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetKhalaBillQuery } from "../khalaBillApi";

const MonthlyKhalaBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetKhalaBillQuery();

  const users = data?.data?.users || [];

  const userMonthlyData = users?.find((user) => user?.userId === id) || {};

  const {
    name: userName = "",
    totalKhalaBill =0 ,
    khalaBillList: userBillList = [],
  } = userMonthlyData || {};

  const columns = [
    { key: "date", label: "Date" },
    { key: "khalaBill", label: "KhalaBill" },
    { key: "isPaid", label: "Status" },
  ];

  const actions = [
    {
      label: <EditBtn />,
      onClick: (item) => {
        navigate("/khala-bill", {
          state: {
            editKhalaBill: item,
            userId: id || userMonthlyData?._id,
          },
        });
      },
    },
  ];

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
