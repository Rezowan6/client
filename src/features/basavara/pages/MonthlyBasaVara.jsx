import { useParams } from "react-router-dom";

import Button from "../../../components/Button/Button";
import Loading from "../../../components/loading/Loding";
import ReusableTable from "../../../components/table/ReusableTable";
import Title from "../../../components/title/Title";
import { basaVaraColumns } from "../../../constants/tableColumns";
import { useUserDynamicData } from "../../../hooks/user/useUserDynamicData";
import { useTableActions } from "../../../hooks/useTableAction";
import { useGetUsersBasaVaraHistoryQuery } from "../basaVaraApi";

const MonthlyBasaVara = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUsersBasaVaraHistoryQuery();

  const { user: userMonthlyData, navigate } = useUserDynamicData(data, id);

  const {
    name = "",
    totalBasaVara = 0,
    basaVaraList = [],
  } = userMonthlyData || {};

  const columns = basaVaraColumns;

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
        <Title title={`Name: ${name}`} />
        <Title title={`Name: ${totalBasaVara}`} />
        <Button
          text="Go Back   "
          onclickHandle={() => navigate("/basa-vara")}
        />
      </div>
      <ReusableTable columns={columns} data={basaVaraList} actions={actions} />
    </>
  );
};

export default MonthlyBasaVara;
