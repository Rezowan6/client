import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useTableActions } from "../../../hooks/useTableAction";
import { useGetUsersBasaVaraHistoryQuery } from "../basaVaraApi";

const MonthlyBasaVara = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetUsersBasaVaraHistoryQuery();

  const users = data?.data?.users || [];
  const userMonthlyData = users?.filter((user) => user?.userId === id);

  const { name: userName = "", basaVaraList: userBasaVaraList = [] } =
    userMonthlyData[0] || [];
// console.log(users)
  const columns = [
    {
      key: "date",
      label: "Date",
      render: (item) => new Date(item.date).toLocaleDateString("en-BD"),
    },
    { key: "basaVara", label: "BasaVara" },
    { key: "isPaid", label: "Status" },
  ];

  const actions = useTableActions({
    edit: (item) => {
      navigate("/basa-vara", {
        state: {
          editBasaVara: item,
          userId: id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${userName}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/basa-vara")}
        />
      </div>
      <ReusableTable
        columns={columns}
        data={userBasaVaraList}
        actions={actions}
      />
    </>
  );
};

export default MonthlyBasaVara;
