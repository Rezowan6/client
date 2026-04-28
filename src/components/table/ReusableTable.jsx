import { Link } from "react-router-dom";

const ReusableTable = ({
  link = null,
  columns,
  data,
  actions = [],
  quickAdd,
  onSelectUser,
  selectedUsers = [],
}) => {
  return (
    <div className="w-full overflow-x-auto pb-10">
      <table className="w-full text-center border-collapse">
        {/* table header */}
        <thead className="sticky top-0 bg-gray-900 z-10">
          <tr>
            <th className="border px-2 py-2 text-xs sm:text-sm md:text-base">SL</th>
            {columns.map((col) => (
              <th key={col.key} className="border px-2 py-2 text-xs sm:text-sm md:text-base">
                {col.label}
              </th>
            ))}
            <th className="border px-2 py-2 text-xs sm:text-sm md:text-base">Action</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {data.length ? (
            data.map((item, index) => {
              return (
                <tr key={item._id || item.userId || index} className="hover:bg-cyan-800/50 active:bg-cyan-800/50">
                  <td className="border px-2 py-2 text-xs sm:text-sm"> {index + 1} </td>

                  {columns.map((col) => {
                    const isSelect = col.key === "select";

                    return (
                      <td key={col.key} className="border px-2 py-2 text-xs sm:text-sm">
                        {col.render
                          ? isSelect
                            ? col.render(item, onSelectUser, selectedUsers)
                            : col.render(item, quickAdd)
                          : item[col.key]}
                      </td>
                    );
                  })}

                  <td className="border py-2">
                    {actions.map((action, i) => {
                      if (link === "meal") {
                        return (
                          <div key={i} className={action.className}>
                            <Link
                              to={`/mill/${item.userId}`}
                              state={item}
                              className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                            >
                              #view
                            </Link>
                          </div>
                        );
                      }
                      if (link === "basaVara") {
                        return (
                          <div key={i} className={action.className}>
                            <Link
                              to={`/montly-basaVara/${item.userId}`}
                              state={item}
                              className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                            >
                              #View
                            </Link>
                          </div>
                        );
                      }
                      if (link === "currentBill") {
                        return (
                          <Link
                            to={`/currentBill/${item.userId}`}
                            state={item}
                            className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                          >
                            #view
                          </Link>
                        );
                      }
                      if (link === "khalaBill") {
                        return (
                          <Link
                            to={`/khalaBill/${item.userId}`}
                            state={item}
                            className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                          >
                            #view
                          </Link>
                        );
                      }
                      if (link === "balance") {
                        return (
                          <Link
                            to={`/balance/${item.userId}`}
                            state={item}
                            className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                          >
                            #view
                          </Link>
                        );
                      }
                      if (link === "egg") {
                        return (
                          <Link
                            to={`/egg/${item.userId}`}
                            state={item}
                            className="hover:text-cyan-500 text-xs lg:text-sm border-b"
                          >
                            #view
                          </Link>
                        );
                      } else {
                        return (
                          <span
                            key={item?.userId || item?._id}
                            onClick={() => action.onClick(item)}
                            className="cursor-pointer inline-flex"
                          >
                            {action.label}
                          </span>
                        );
                      }
                    })}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
