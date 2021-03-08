import React from "react";
import { ROUTE_NAME } from "../constants/key";

const Dashboard = React.lazy(() => import("src/pages/dashboard/Dashboard"));
const Course = React.lazy(() => import("src/pages/course/Course"));
const Account = React.lazy(() => import("src/pages/account/Account"));
const Profile = React.lazy(() => import("src/pages/profile/Profile"));
const Proposal = React.lazy(() => import("src/pages/proposal/Proposal"));
const RollUp = React.lazy(() => import("src/pages/roll-up/RollUp"));
const Notification = React.lazy(() =>
  import("src/pages/notification/Notification")
);
const Report = React.lazy(() => import("src/pages/report/Report"));
const General = React.lazy(() => import("src/pages/setting/general/General"));
const Position = React.lazy(() =>
  import("src/pages/setting/position/NewPosition")
);
const Shift = React.lazy(() => import("src/pages/setting/shift/Shift"));
const NewShift = React.lazy(() => import("src/pages/setting/shift/NewShift"));
const ShiftEdit = React.lazy(() => import("src/pages/setting/shift/NewShift"));
const Department = React.lazy(() =>
  import("src/pages/setting/department/Department")
);
const Holiday = React.lazy(() => import("src/pages/setting/holiday/Holiday"));
const NewHoliday = React.lazy(() =>
  import("src/pages/setting/holiday/NewHoliday")
);
const Branch = React.lazy(() => import("src/pages/setting/branch/NewBranch"));
const Permission = React.lazy(() =>
  import("src/pages/setting/authorization/permission/Permission")
);
const PermissionGroup = React.lazy(() =>
  import("src/pages/setting/authorization/permission-group/PermissionGroup")
);
const Role = React.lazy(() =>
  import("src/pages/setting/authorization/role/Role")
);

const routes = [
  { path: "/", exact: true, name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: "/dashboard", name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: "/course", name: ROUTE_NAME.COURSE, component: Course },
  { path: "/account", name: ROUTE_NAME.ACCOUNT, component: Account },
  { path: "/profile", name: ROUTE_NAME.PROFILE, component: Profile },
  { path: "/proposal", name: ROUTE_NAME.PROPOSAL, component: Proposal },
  { path: "/roll-up", name: ROUTE_NAME.ROLL_UP, component: RollUp },
  {
    path: "/notification",
    name: ROUTE_NAME.NOTIFICATION,
    component: Notification,
  },
  { path: "/report", name: ROUTE_NAME.REPORT, component: Report },
  {
    path: "/setting",
    exact: true,
    name: ROUTE_NAME.SETTING,
    component: General,
  },
  { path: "/setting/general", name: ROUTE_NAME.GENERAL, component: General },
  { path: "/setting/position", name: ROUTE_NAME.POSITION, component: Position },
  {
    path: "/setting/shift/newShift",
    name: ROUTE_NAME.NEW_SHIFT,
    component: NewShift,
  },
  {
    path: "/setting/shift/:id",
    name: ROUTE_NAME.SHIFT_UPDATE,
    component: ShiftEdit,
  },
  { path: "/setting/shift", name: ROUTE_NAME.SHIFT, component: Shift },
  { path: "/setting/branch", name: ROUTE_NAME.BRANCH, component: Branch },
  {
    path: "/setting/department",
    name: ROUTE_NAME.DEPARTMENT,
    component: Department,
  },
  { path: "/setting/holiday", name: ROUTE_NAME.HOLIDAY, component: Holiday },
  {
    path: "/setting/new-holiday",
    name: ROUTE_NAME.NEW_HOLIDAY,
    component: NewHoliday,
  },
  {
    path: "/setting/authorization",
    exact: true,
    name: ROUTE_NAME.PERMISSION,
    component: Permission,
  },
  {
    path: "/setting/authorization/permission",
    name: ROUTE_NAME.PERMISSION,
    component: Permission,
  },
  {
    path: "/setting/authorization/permission-group",
    name: ROUTE_NAME.PERMISSION_GROUP,
    component: PermissionGroup,
  },
  {
    path: "/setting/authorization/role",
    name: ROUTE_NAME.ROLE,
    component: Role,
  },
];

export default routes;
