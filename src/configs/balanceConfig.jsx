const balanceConfig = {
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
        name: "tk",
        type: "number",
        label: "Balance",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "totalTk", label: "Balance" },
      {
        key: "tk",
        label: "AddBalance",
        render: (row, onAddBalance) => {
          return (
            <div className="flex gap-2 sm:gap-6 justify-center">
              {[500, 1000, 1500].map((val) => {
                return (
                  <button
                    key={val}
                    onClick={() => {
                      return onAddBalance(row, val);
                    }}
                    className="
                    w-16 h-8 bg-cyan-600  hover:bg-cyan-400 rounded text-white font-bold"
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

  totalKey: "grandTotalTk",
};

export default balanceConfig;
