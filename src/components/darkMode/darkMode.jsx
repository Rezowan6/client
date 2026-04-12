import { useContext } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

import { ThemeContext } from "../../context/ThemeContext";

const DarkMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      {/* sun & moon */}
      <button onClick={toggleTheme} className="text-2xl ml-4">
        {theme === "dark" ? <HiSun /> : <HiMoon />}
      </button>
    </div>
  );
};

export default DarkMode;
