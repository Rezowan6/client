import { navigationConfig, commonNav } from "../configs/nav/index";

export const getNavigationByRole = (roles) => {
  
  const userRoles = Array.isArray(roles) ? roles : [roles || "user"];

  let combinedNav = [...commonNav];

  userRoles.forEach(role => {
    const roleNav = navigationConfig[role];
    if (roleNav) {
      
      combinedNav = [...combinedNav, ...roleNav];
    }
  });

  return combinedNav;
};
