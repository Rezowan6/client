import React from "react";

const MonthlyCostTable = ({ data }) => {
  return (
    <div className="p-4">

      <h2 className="text-xl font-bold mb-2">
        Monthly Cost Report
      </h2>

      <p className="mb-4 font-medium">
        Admin: {data.adminName}
      </p>

      <table className="w-full border border-gray-400">

        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Day</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Signature</th>
          </tr>
        </thead>

        <tbody>
          {data.dailyCosts.map((dayData, index) => (
            <React.Fragment key={index}>

              {/* Items Row */}
              {dayData.items.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">
                    {dayData.day}
                  </td>

                  <td className="border p-2">
                    {item.desc}
                  </td>

                  <td className="border p-2">
                    {item.cost}
                  </td>

                  <td className="border p-2">
                    {item.signature}
                  </td>
                </tr>
              ))}

              {/* Day Total Row */}
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan="2"
                  className="border p-2 text-right"
                >
                  Day Total
                </td>

                <td className="border p-2">
                  {dayData.totalCost}
                </td>

                <td className="border p-2"></td>
              </tr>

            </React.Fragment>
          ))}

          {/* Grand Total */}
          <tr className="bg-yellow-200 font-bold">
            <td
              colSpan="2"
              className="border p-2 text-right"
            >
              Grand Total
            </td>

            <td className="border p-2">
              {data.grandTotalCost}
            </td>

            <td className="border p-2"></td>
          </tr>

        </tbody>

      </table>

    </div>
  );
};

export default MonthlyCostTable;