import { NavLink } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigation = useNavigation(user?.role);

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <div className="space-y-6">
        {navigation?.map((section, index) => (
          <div key={index}>

            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-3">
              {section.group}
            </h3>

            <ul className="space-y-2">
              {section?.links?.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path}>{link.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;
