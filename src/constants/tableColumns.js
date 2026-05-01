export const basaVaraColumns = [
  {
    key: "date",
    label: "Date",
    render: (item) => new Date(item.date).toLocaleDateString("en-BD"),
  },
  {
    key: "basaVara",
    label: "Balance",
  },
];

export const currentBillColumns = [
  {
    key: "date",
    label: "Date",
    render: (item) => new Date(item.date).toLocaleDateString("en-BD"),
  },
  { key: "balance", label: "Balance" },
];

export const khalaBillColumns = [
  {
    key: "date",
    label: "Date",
    render: (item) => new Date(item.date).toLocaleDateString("en-BD"),
  },
  { key: "balance", label: "Balance" },
];

export const balanceColumns = [
  { key: "day", label: "Day" },
  { key: "balance", label: "Balance" },
];

export const incidantaExpensesColumns = [
  {
    key: "date",
    label: "Date",
    render: (item) => new Date(item.date).toLocaleDateString("en-BD"),
  },
  { key: "egg", label: "Egg" },
  { key: "otherCost", label: "OtherCost" },
];
