import EditBtn from "../../../components/Button/EditBtn";

export const millTableActions = (editItem, setValues) => [
  {
    label: <EditBtn action="edit" />,
    onClick: (item) => editItem(item, setValues),
  },
];
