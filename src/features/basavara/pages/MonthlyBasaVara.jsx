import { useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetUsersBasaVaraQuery } from "../basaVaraApi";
import Loading from "../../../components/loading/Loding";

const MonthlyBasaVara = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { data, isLoading } = useGetUsersBasaVaraQuery();

  const users = data?.data?.users;
  const userMonthlyData = users?.filter((user) => user?.userId === id);

  const { name="", basaVaraList=[] } = location.state;
  const { name: userName="", basaVaraList: userBasaVaraList=[] } = userMonthlyData[0] || [];

  const columns = [
    { key: "date", label: "Date" },
    { key: "basaVara", label: "BasaVara" },
    { key: "isPaid", label: "Status" },
  ];

  const actions = [
    {
      label: <EditBtn />,
      onClick: (item) => {
        navigate("/basa-vara", {
          state: {
            editBasaVara: item,
            userId: id,
          },
        });
      },
    },
  ];

  if(isLoading) return <Loading />

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name || userName}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/basa-vara")}
        />
      </div>
      <ReusableTable
        columns={columns}
        data={basaVaraList || userBasaVaraList}
        actions={actions}
      />
    </>
  );
};

export default MonthlyBasaVara;
