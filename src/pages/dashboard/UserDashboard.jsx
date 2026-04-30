import Loading from "../../components/loading/Loding";

import profilImg from "../../assets/images/app.png";
import DashboardCard from "../../components/card/DashboardCard";
import { useUserDashboard } from "../../hooks/useUserDashboard";

const UserDashboard = () => {
  const { isLoading, name, email, role, dashboardCards } = useUserDashboard();

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-full lg:max-w-4xl mx-auto pt-6">
      {/* Header */}
      <div className="bg-gray-700 shadow rounded-2xl p-6 flex items-center gap-6">
        <img
          src={profilImg}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p>{email}</p>
          <p className="text-sm">{role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Details */}
      <div className="bg-gray-700 shadow rounded-2xl p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Profile Details</h3>

        <div className="space-y-2">
          <p>{/*  Address: {user?.address} */}</p>
          <p>{/*  Joined: {user?.createdAt} */}</p>
          <p>{/*  Phone: {user?.phone} */}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
