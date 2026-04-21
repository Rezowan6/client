const incidentalExpensesConfig = {
  title: "Balance",

  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "totalOtherCost",
        type: "number",
        label: "Total Other Cost",
      },
      {
        name: "otherCost",
        type: "number",
        label: "Other-Cost",
      },
      {
        name: "egg",
        type: "number",
        label: "Egg",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalOtherCost", label: "OtherCost" },
      {
        key: "select",
        label: "Select",
        render: (row, onSelectUser, selectedUsers) => {
          return (
            <label className="inline-flex justify-center items-center w-8 h-8 text-center cursor-pointer bg-cyan-600 hover:bg-cyan-400 shadow-lg py-2 rounded-md">
              <input
                className="w-4 h-4 cursor-pointer accent-[#0ef]"
                type="checkbox"
                checked={selectedUsers?.includes(row.userId)}
                onChange={() => onSelectUser(row.userId)}
              />
            </label>
          );
        },
      },
      { key: "totalEgg", label: "Egg" },
      {
        key: "egg",
        label: "EggAdd",
        render: (row, onAddEggClick) => {
          return (
            <div className="flex gap-2 sm:gap-6 justify-center">
              {[1, 2, 3].map((val) => {
                return (
                  <button
                    key={val}
                    onClick={() => {
                      return onAddEggClick(row, val);
                    }}
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
                );
              })}
            </div>
          );
        },
      },
    ],
  },

  totalKey: "grandTotalIncidnetal",
};

export default incidentalExpensesConfig;
