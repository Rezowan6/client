import { Link } from "react-router-dom";

const ReusableTable = ({
  link = false,
  columns,
  data,
  actions = [],
  onAddMillClick,
}) => {
  return (
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
        {data.length ? (
          data.map((item, index) => {
            return (
              <tr key={item._id || item.userId}>
                <td className="border py-2"> {index + 1} </td>

                {columns.map((col) => (
                  <td key={col.key} className="border py-2">
                    {col.render
                      ? col.render(item, onAddMillClick)
                      : item[col.key]}
                  </td>
                ))}

                <td className="border py-2">
                  {actions.map((action, i) => (
                    <div key={i} className={action.className}>
                      {link ? (
                        <Link to={`/mill/${item.userId}`} state={item}
                        className="hover:text-cyan-500"
                        >View Daily Mill</Link>
                      ) : (
                        <span
                          onClick={() => action.onClick(item)}
                          className="cursor-pointer inline-flex"
                        >
                          {action.label}
                        </span>
                      )}
                    </div>
                  ))}
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
  );
};

export default ReusableTable;
