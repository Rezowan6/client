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
    <div className="overflow-x-auto">
      <table className="min-w-full text-center border-collapse">
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
          {data.length ? (
            data.map((item, index) => {
              return (
                <tr key={item._id || item.userId || index} className="hover:bg-cyan-800/50">
                  <td className="border py-2"> {index + 1} </td>

                  {columns.map((col) => {
                    const isSelect = col.key === "select";

                    return (
                      <td key={col.key} className="border py-2">
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
                            key={item?.userId}
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
