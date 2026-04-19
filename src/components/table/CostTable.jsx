const CostTable = ({ columns, data, actions }) => {
  const today = new Date().getDate();
  return (
    <>
      <table className="w-full text-center border-collapse">
        {/* table header */}
        <thead>
          <tr>
            <th className="border py-2">SL</th>
            {columns.map((col) => (
              <th key={col.key} className="border py-2">
                {col.label}
              </th>
            ))}
            <th className="border py-2">Action</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {data?.dailyCosts?.length ? (
            data?.dailyCosts?.map((dayItem, index) => {
              return dayItem.items.map((item, i) => (
                <tr key={i}>
                  <td className="border py-2">{index + 1}</td>

                  {columns.map((col) => (
                    <td key={col.key} className="border py-2">
                      {/* nested data handle */}
                      {col.key === "desc" && item.desc}
                      {col.key === "signature" && item.signature}
                      {col.key === "totalCost" && dayItem.totalCost}
                      {col.key === "day" && dayItem.day}
                    </td>
                  ))}

                  <td className="border py-2">
                    {actions.map((action, i) => {
                      const isEditable = dayItem.day === today;

                      return (
                        <div
                          key={i}
                          onClick={() => isEditable && action.onClick(dayItem)}
                          className={
                            isEditable
                              ? action.className
                              : "cursor-not-allowed"
                          }
                        >
                          {action.label}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ));
            })
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CostTable;
