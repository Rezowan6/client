import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";

const DailayEggIncidantal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { name, totalEgg, dailyData, totalOtherCost } = location.state;
//   console.log(location);
  const columns = [
    { key: "day", label: "Day" },
    { key: "egg", label: "Egg" },
    { key: "otherCost", label: "OtherCost" },
  ];

  const actions = [
    {
      label: <EditBtn />,
      onClick: (item) => {
        navigate("/incidental-cost", {
          state: {
            editDailyData: item,
            userId: id,
          },
        });
      },
    },
  ];

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/incidental-cost")} />
      </div>
      <Title title={`Total Egg: ${totalEgg}`} />
      <Title title={`Total OtherCost: ${totalOtherCost}`} />
      <ReusableTable columns={columns} data={dailyData} actions={actions} />
    </>
  );
};

export default DailayEggIncidantal;
