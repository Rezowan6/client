import AlertPopup from "../../components/alertPopup/AlertPopup";
import ReusableTable from "../../components/table/ReusableTable";
import EditBtn from "../../components/Button/EditBtn";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/users/userApi";
import useAlert from "../../hooks/useAlert";

const UserList = () => {
  const { alertData, showAlert, showConfirm, closeAlert, confirmAction } =
    useAlert();
    
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const columns = [{ key: "name", label: "Name" }];

  // delete action
  const actions = [
    {
      label: <EditBtn action='delete'/>,
      className: "text-white text-white px-2 py-1 mx-1",
      onClick: (item) => deleteConfirm(item._id),
    },
  ];

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-white text-center">Error: {error.data?.message}</p>;

  // delete user
  const deleteSubmit = async (id) => {
    try {
      const { data } = await deleteUser(id);
      showAlert("Success", data?.message || "User delete success!");
    } catch (error) {
      showAlert("Error", error?.response?.data?.message || "User delete failed");
    }
  };

  // confirm before delete
  const deleteConfirm = (id) => {
    showConfirm(
      "Delete User",
      "Are you sure you want to delete this user?",
      () => deleteSubmit(id),
    );
  };

  return (
    <>
      <div className="text-white p-6">
        <h1 className="text-3xl text-cyan-400 py-3">Boarder List</h1>
        <ReusableTable
          columns={columns}
          data={data?.data?.users || []}
          actions={actions}
        />

        <AlertPopup
          show={alertData.show}
          title={alertData.title}
          message={alertData.message}
          type={alertData.type}
          autoHide={alertData.autoHide}
          onClose={closeAlert}
          onConfirm={confirmAction}
        />
      </div>
    </>
  );
};

export default UserList;
