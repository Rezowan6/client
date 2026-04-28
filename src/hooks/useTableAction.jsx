import EditBtn from "./../components/Button/EditBtn";

export const useTableActions = ({
  edit = null,
  delete: deleteAction = null,
}) => {
  const actions = [];

  // Edit
  if (edit) {
    actions.push({
      label: <EditBtn action="edit" />,
      onClick: (item) => edit(item),
    });
  }

  // Delete
  if (deleteAction) {
    actions.push({
      label: <EditBtn action="delete" />,
      onClick: (item) => deleteAction(item || item?._id),
    });
  }

  return actions;
};
