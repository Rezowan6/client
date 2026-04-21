const millConfig = {
  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "1",
        type: "checkbox",
        label: "1",
        dataGroup: "mill",
      },
      {
        name: "2",
        type: "checkbox",
        label: "2",
        dataGroup: "mill",
      },
      {
        name: "3",
        type: "checkbox",
        label: "3",
        dataGroup: "mill",
      },
      {
        name: "mill",
        type: "number",
        label: "Meal",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalMill", label: "Meal" },
      {
        key: "mill",
        label: "Add-Meal",
        render: (row, onAddMillClick) => {
        return (
            <div className="flex gap-2 sm:gap-6 justify-center">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => onAddMillClick(row, val)}
                  className="
                  w-8 h-8
                  bg-cyan-600
                  hover:bg-cyan-400
                  rounded
                  text-white
                  font-bold
                  "
                >
                  {val}
                </button>
              ))}
            </div>
          );
        },
      },
    ],
  },

  totalKey: "grandTotalMill",
};

export default millConfig;
