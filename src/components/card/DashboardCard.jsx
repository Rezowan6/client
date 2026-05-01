import { Link } from "react-router-dom";

const DashboardCard = ({ ...data }) => {

  const { title, value, link, actionText, type, conditionalColor } = data || {};
  const content = (
    <div
      className={`bg-gray-700 hover:bg-cyan-900 hover:scale-105 transition flex items-center gap-8 p-4 rounded-xl shadow ${
        conditionalColor === undefined
          ? ""
          : conditionalColor
            ? "text-green-500"
            : "text-red-500"
      }`}
    >
      <div>
        <p>{title}</p>
        <h3 className="text-lg font-bold">
          {type === "money" && typeof value === "number"
            ? value.toFixed(2)
            : value}
        </h3>
      </div>

      {actionText && <span className="text-xs border-b">{actionText}</span>}
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
};

export default DashboardCard;
