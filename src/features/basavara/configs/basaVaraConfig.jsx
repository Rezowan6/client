const basaVaraConfig = {
  title: "BasaVara",
  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "basaVara",
        type: "number",
        label: "Balance",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "basaVara", label: "Balance" },
      {
        key: "balance",
        label: "AddBalance",
        render: (row, onAddBalance) => {
          return (
            <div className="flex gap-2 sm:gap-6 justify-center">
              {[1000, 1200].map((val) => {
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
      { key: "isPaid", label: "Status" },
    ],
  },

  totalKey: "totalBasaVara",
};

export default basaVaraConfig;
