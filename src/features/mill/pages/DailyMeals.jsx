import { useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useGetUsersMillQuery } from "../millApi";
import Loading from "../../../components/loading/Loding";

const DailyMeals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { data, isLoading } = useGetUsersMillQuery();

  const users = data?.data?.users;
  const userDailyMill = users?.filter((user) => user?.userId === id);

  const { name: userName, totalMill: userTotalMill, dailyMill: userDailyMills } = location.state;

  const { name="", totalMill=0, dailyMill=[] } = userDailyMill[0] || [];

  const columns = [
    { key: "day", label: "Day" },
    { key: "mill", label: "Meal" },
  ];

  const actions = [
    {
      label: <EditBtn />,
      onClick: (item) => {
        navigate("/mills", {
          state: {
            editDailyMill: item,
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
        <Title title={`Name: ${userName || name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/mills")} />
      </div>
      <Title title={`Total: ${userTotalMill || totalMill}`} />
      <ReusableTable columns={columns} data={userDailyMills || dailyMill} actions={actions} />
    </>
  );
};

export default DailyMeals;
