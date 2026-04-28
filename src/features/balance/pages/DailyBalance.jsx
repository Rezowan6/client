import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import EditBtn from "../../../components/Button/EditBtn";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { useTableActions } from "../../../hooks/useTableAction";

const DailyMeals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { name, totalTk, dailyTk } = location.state;

  const columns = [
    { key: "day", label: "Day" },
    { key: "tk", label: "Balance" },
  ];

  const actions = useTableActions(
    {
      edit: (item) => {
        navigate("/create-balance", {
          state: {
            editDailyTk: item,
            userId: id,
          },
        });
      },
    })

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/create-balance")} />
      </div>
      <Title title={`Total: ${totalTk}`} />
      <ReusableTable columns={columns} data={dailyTk} actions={actions} />
    </>
  );
};

export default DailyMeals;
