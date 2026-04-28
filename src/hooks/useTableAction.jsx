import EditBtn from "./../components/Button/EditBtn";

export const useTableActions = (
  editItem,
  deleteItem,
  setValues,
  options = {}
) => {
  const { showEdit = true, showDelete = true } = options;

  const actions = [];

  if (showEdit) {
    actions.push({
      label: <EditBtn action="edit" />,
      onClick: (item) => editItem(item, setValues),
    });
  }

  if (showDelete) {
    actions.push({
      label: <EditBtn action="delete" />,
      onClick: (item) => deleteItem(item),
    });
  }

  return actions;
};
