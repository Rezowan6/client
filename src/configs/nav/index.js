import { ROLES } from "../../constants/roles";

import { adminNav } from "./admin.nav";
import { subAdminNav } from "./subAdmin.nav";
import { userNav } from "./user.nav";
import { commonNav } from "./common.nav.jsx";

export const navigationConfig = {
  [ROLES.ADMIN]: adminNav,
  [ROLES.SUB_ADMIN]: subAdminNav,
  [ROLES.USER]: userNav,
};

export { commonNav };