import React from 'react';
import { ROUTE_NAME, ROUTE_PATH } from '../constants/key';

const Dashboard = React.lazy(() => import('src/pages/dashboard/Dashboard'));
const Course = React.lazy(() => import('src/pages/course/Course'));

const Account = React.lazy(() => import('src/pages/account/Account'));
const NewAccount = React.lazy(() => import('src/pages/account/NewAccount'));
const EditAccount = React.lazy(() => import('src/pages/account/UpdateAccount'));

const Profile = React.lazy(() => import('src/pages/profile/Profile'));
const NewProfile = React.lazy(() => import('src/pages/profile/NewProfile'));
const EditProfile = React.lazy(() => import('src/pages/profile/UpdateProfile'));
const NewContract = React.lazy(() => import('src/pages/profile/JobTimeline'));
const EditContract = React.lazy(() => import('src/pages/profile/JobTimeline'));

const Proposal = React.lazy(() => import('src/pages/proposal/Proposal'));
const RollUp = React.lazy(() => import('src/pages/roll-up/RollUp'));
const Notification = React.lazy(() => import('src/pages/notification/Notification'));
const NewNotification = React.lazy(() => import('src/pages/notification/NewNotification'));
const EditNotification = React.lazy(() => import('src/pages/notification/UpdateNotification'));

const Report = React.lazy(() => import('src/pages/report/Report'));
const General = React.lazy(() => import('src/pages/setting/general/General'));
const Position = React.lazy(() => import('src/pages/setting/position/Position'));
const NewPosition = React.lazy(() => import('src/pages/setting/position/NewPosition'));
const EditPosition = React.lazy(() => import('src/pages/setting/position/UpdatePosition'));

const Shift = React.lazy(() => import('src/pages/setting/shift/Shift'));
const NewShift = React.lazy(() => import('src/pages/setting/shift/NewShift'));
const UpdateShift = React.lazy(() => import('src/pages/setting/shift/UpdateShift'));

const Department = React.lazy(() => import('src/pages/setting/department/Department'));
const NewDepartment = React.lazy(() => import('src/pages/setting/department/NewDepartment'));
const EditDepartment = React.lazy(() => import('src/pages/setting/department/EditDepartment'));

const Holiday = React.lazy(() => import('src/pages/setting/holiday/Holiday'));
const NewHoliday = React.lazy(() => import('src/pages/setting/holiday/NewHoliday'));
const EditHoliday = React.lazy(() => import('src/pages/setting/holiday/UpdateHoliday'));
const EditHolidaySetting = React.lazy(() => import('src/pages/setting/holiday/HolidaySettings'));

const Branch = React.lazy(() => import('src/pages/setting/branch/Branch'));
const NewBranch = React.lazy(() => import('src/pages/setting/branch/NewBranch'));
const EditBranch = React.lazy(() => import('src/pages/setting/branch/UpdateBranch'));

// const Permission = React.lazy(() => import('src/pages/setting/authorization/permission/Permission'));
// const PermissionGroup = React.lazy(() => import('src/pages/setting/authorization/permission-group/PermissionGroup'));
const Role = React.lazy(() => import('src/pages/setting/authorization/role/Role'));
const NewRole = React.lazy(() => import('src/pages/setting/authorization/role/NewRole'));
const EditRole = React.lazy(() => import('src/pages/setting/authorization/role/UpdateRole'));

const Wage = React.lazy(() => import('src/pages/setting/wage/Wage'));
const NewWage = React.lazy(() => import('src/pages/setting/wage/NewWage'));
const EditWage = React.lazy(() => import('src/pages/setting/wage/UpdateWage'));

const Allowance = React.lazy(() => import('src/pages/setting/allowance/Allowance'));
const NewAllowance = React.lazy(() => import('src/pages/setting/allowance/NewAllowance'));
const EditAllowance = React.lazy(() => import('src/pages/setting/allowance/UpdateAllowance'));

const routes = [
  { path: ROUTE_PATH.ROOT, exact: true, name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: ROUTE_PATH.DASHBOARD, name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: ROUTE_PATH.COURSE, name: ROUTE_NAME.COURSE, component: Course },

  { path: ROUTE_PATH.ACCOUNT_CREATE, name: ROUTE_NAME.NEW_ACCOUNT, component: NewAccount },
  { path: ROUTE_PATH.ACCOUNT_UPDATE, name: ROUTE_NAME.ACCOUNT_UPDATE, component: EditAccount },
  { path: ROUTE_PATH.ACCOUNT, name: ROUTE_NAME.ACCOUNT, component: Account },

  { path: ROUTE_PATH.CONTRACT_CREATE, name: ROUTE_NAME.NEW_CONTRACT, component: NewContract },
  { path: ROUTE_PATH.CONTRACT_UPDATE, name: ROUTE_NAME.CONTRACT_UPDATE, component: EditContract },

  { path: ROUTE_PATH.PROFILE_CREATE, name: ROUTE_NAME.NEW_PROFILE, component: NewProfile },
  { path: ROUTE_PATH.PROFILE_UPDATE, name: ROUTE_NAME.PROFILE_UPDATE, component: EditProfile },
  { path: ROUTE_PATH.PROFILE, name: ROUTE_NAME.PROFILE, component: Profile },
  { path: ROUTE_PATH.PROPOSAL, name: ROUTE_NAME.PROPOSAL, component: Proposal },
  { path: ROUTE_PATH.ROLL_UP, name: ROUTE_NAME.ROLL_UP, component: RollUp },
  {
    path: ROUTE_PATH.NOTIFICATION_CREATE,
    name: ROUTE_NAME.NEW_NOTIFICATION,
    component: NewNotification,
  },
  {
    path: ROUTE_PATH.NOTIFICATION_UPDATE,
    name: ROUTE_NAME.NOTIFICATION_UPDATE,
    component: EditNotification,
  },
  {
    path: ROUTE_PATH.NOTIFICATION,
    name: ROUTE_NAME.NOTIFICATION,
    component: Notification,
  },
  { path: ROUTE_PATH.REPORT, name: ROUTE_NAME.REPORT, component: Report },
  {
    path: ROUTE_PATH.SETTING,
    exact: true,
    name: ROUTE_NAME.SETTING,
    component: General,
  },
  { path: ROUTE_PATH.GENERAL, name: ROUTE_NAME.GENERAL, component: General },
  {
    path: ROUTE_PATH.POSITION_CREATE,
    exact: true,
    name: ROUTE_NAME.NEW_POSITION,
    component: NewPosition,
  },
  {
    path: ROUTE_PATH.POSITION_UPDATE,
    name: ROUTE_NAME.POSITION_UPDATE,
    component: EditPosition,
  },
  { path: ROUTE_PATH.POSITION, name: ROUTE_NAME.POSITION, component: Position },
  {
    path: ROUTE_PATH.SHIFT_CREATE,
    exact: true,
    name: ROUTE_NAME.NEW_SHIFT,
    component: NewShift,
  },
  {
    path: ROUTE_PATH.SHIFT_UPDATE,
    name: ROUTE_NAME.SHIFT_UPDATE,
    component: UpdateShift,
  },
  { path: ROUTE_PATH.SHIFT, name: ROUTE_NAME.SHIFT, component: Shift },
  {
    path: ROUTE_PATH.BRANCH_CREATE,
    exact: true,

    name: ROUTE_NAME.NEW_BRANCH,
    component: NewBranch,
  },
  {
    path: ROUTE_PATH.BRANCH_UPDATE,
    name: ROUTE_NAME.BRANCH_UPDATE,
    component: EditBranch,
  },
  { path: ROUTE_PATH.BRANCH, name: ROUTE_NAME.BRANCH, component: Branch },
  {
    path: ROUTE_PATH.DEPARTMENT_CREATE,
    exact: true,

    name: ROUTE_NAME.NEW_DEPARTMENT,
    component: NewDepartment,
  },
  {
    path: ROUTE_PATH.DEPARTMENT_UPDATE,
    name: ROUTE_NAME.DEPARTMENT_UPDATE,
    component: EditDepartment,
  },
  {
    path: ROUTE_PATH.DEPARTMENT,
    name: ROUTE_NAME.DEPARTMENT,
    component: Department,
  },
  {
    path: ROUTE_PATH.HOLIDAY + '/tab1.id=create',
    exact: true,
    name: ROUTE_NAME.NEW_HOLIDAY,
    component: NewHoliday,
  },
  {
    path: ROUTE_PATH.HOLIDAY_UPDATE_SETTING,
    exact: true,
    name: ROUTE_NAME.HOLIDAY_SETTINGS_UPDATE,
    component: EditHolidaySetting,
  },
  {
    path: ROUTE_PATH.HOLIDAY_UPDATE,
    exact: true,
    name: ROUTE_NAME.HOLIDAY_UPDATE,
    component: EditHoliday,
  },
  { path: ROUTE_PATH.HOLIDAY, name: ROUTE_NAME.HOLIDAY, component: Holiday },
  // {
  //   path: '/setting/authorization',
  //   exact: true,
  //   name: ROUTE_NAME.PERMISSION,
  //   component: Permission,
  // },
  // {
  //   path: '/setting/authorization/permission',
  //   name: ROUTE_NAME.PERMISSION,
  //   component: Permission,
  // },
  // {
  //   path: '/setting/authorization/permission-group',
  //   name: ROUTE_NAME.PERMISSION_GROUP,
  //   component: PermissionGroup,
  // },
  {
    path: ROUTE_PATH.ROLE_CREATE,
    name: ROUTE_NAME.NEW_ROLE,
    component: NewRole,
  },
  {
    path: ROUTE_PATH.ROLE_UPDATE,
    name: ROUTE_NAME.ROLE_UPDATE,
    component: EditRole,
  },
  {
    path: ROUTE_PATH.ROLE,
    name: ROUTE_NAME.ROLE,
    component: Role,
  },
  {
    path: ROUTE_PATH.WAGE_CREATE,
    exact: true,

    name: ROUTE_NAME.WAGE_CREATE,
    component: NewWage,
  },
  {
    path: ROUTE_PATH.WAGE_UPDATE,
    name: ROUTE_NAME.WAGE_UPDATE,
    component: EditWage,
  },
  { path: ROUTE_PATH.WAGE, name: ROUTE_NAME.WAGE, component: Wage },
  {
    path: ROUTE_PATH.ALLOWANCE_CREATE,
    exact: true,

    name: ROUTE_NAME.ALLOWANCE_CREATE,
    component: NewAllowance,
  },
  {
    path: ROUTE_PATH.ALLOWANCE_UPDATE,
    name: ROUTE_NAME.ALLOWANCE_UPDATE,
    component: EditAllowance,
  },
  { path: ROUTE_PATH.ALLOWANCE, name: ROUTE_NAME.ALLOWANCE, component: Allowance },
];

export default routes;
