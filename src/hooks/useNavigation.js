import { getNavigationByRole } from "../utils/getNavByRole.js";

export const useNavigation = (userRole) => {

  const navigation = getNavigationByRole(userRole);

  return navigation;
};