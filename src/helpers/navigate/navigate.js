import { useNavigate } from "react-router-dom";

export const useNavigator = (route) => {
  const navigate = useNavigate();

  const navigator = () => {
    if (route) {
      navigate(route);
    }
  };

  return navigator;
};
