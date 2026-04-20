import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";

const DailyMeals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { name, totalMill, dailyMill } = location.state;

  const columns = [
    { key: "day", label: "Day" },
    { key: "mill", label: "Mill" },
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

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Title title={`Name: ${name}`} />
          <Title title={`Total: ${totalMill}`} />
        </div>
        <Button text="Go Back Mill page" onclickHandle={() => navigate("/mills")} />
      </div>

      <ReusableTable columns={columns} data={dailyMill} actions={actions} />
    </>
  );
};

export default DailyMeals;
