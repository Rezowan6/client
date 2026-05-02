import { useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { mealColumns } from "../../../constants/tableColumns";
import { useUserDynamicData } from "../../../hooks/user/useUserDynamicData";
import { useTableActions } from "../../../hooks/useTableAction";
import { useGetUsersMillQuery } from "../millApi";

const DailyMeals = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUsersMillQuery();

  const { user: userDailyMill, navigate } = useUserDynamicData(data, id) || {};

  const { name = "", totalMill = 0, dailyMill = [] } = userDailyMill || {};

  const columns = mealColumns;

  const actions = useTableActions({
    edit: (item) => {
      navigate("/mills", {
        state: {
          editDailyMill: item,
          userId: id,
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="pb-4 flex flex-col justify-between items-center sm:flex-row">
        <Title title={`Name: ${name}`} />
        <Button text="Go Back   " onclickHandle={() => navigate("/mills")} />
      </div>
      <Title title={`Total: ${totalMill}`} />
      <ReusableTable columns={columns} data={dailyMill} actions={actions} />
    </>
  );
};

export default DailyMeals;
