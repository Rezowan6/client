import EditBtn from './../components/Button/EditBtn';

export const useTableActions = (editItem, setValues) => [
  {
    label: <EditBtn action="edit" />,
    onClick: (item) => editItem(item, setValues),
  },
];