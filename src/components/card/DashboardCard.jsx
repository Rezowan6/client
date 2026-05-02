import { Link } from "react-router-dom";

const DashboardCard = ({ ...data }) => {
  const { title, value, link, actionText, type, conditionalColor } = data || {};
  const content = (
    <div
      className={`bg-gray-700 hover:bg-cyan-900 hover:scale-105 transition  p-4 rounded-xl shadow ${
        conditionalColor === undefined
          ? ""
          : conditionalColor
            ? "text-green-500"
            : "text-red-500"
      }`}
    >
      <p>{title}</p>
      <div className="flex items-center gap-6 lg:gap-10">
        <h3 className="text-lg font-bold">
          {type === "money" && typeof value === "number"
            ? value.toFixed(2)
            : value}
        </h3>
        {actionText && <span className="text-xs border-b">{actionText}</span>}
      </div>
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
