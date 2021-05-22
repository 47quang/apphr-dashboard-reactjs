import React from 'react';
import { ROUTE_NAME, ROUTE_PATH } from '../constants/key';

const Dashboard = React.lazy(() => import('src/pages/dashboard/Dashboard'));
const Course = React.lazy(() => import('src/pages/course/Course'));

const Account = React.lazy(() => import('src/pages/account/Account'));
const NewAccount = React.lazy(() => import('src/pages/account/AccountItemBody'));
const EditAccount = React.lazy(() => import('src/pages/account/AccountItemBody'));

const Contract = React.lazy(() => import('src/pages/contract/Contract'));
const NewContract = React.lazy(() => import('src/pages/contract/NewContract'));
const EditContract = React.lazy(() => import('src/pages/contract/EditContract'));

const Benefit = React.lazy(() => import('src/pages/benefit/Benefit'));
//const NewContract = React.lazy(() => import('src/pages/contract/NewContract'));
//const EditContract = React.lazy(() => import('src/pages/contract/EditContract'));

const Profile = React.lazy(() => import('src/pages/profile/Profile'));
const NewProfile = React.lazy(() => import('src/pages/profile/NewProfile'));
const EditProfile = React.lazy(() => import('src/pages/profile/UpdateProfile'));
//const NewContract = React.lazy(() => import('src/pages/profile/JobTimeline'));
//const EditContract = React.lazy(() => import('src/pages/profile/JobTimeline'));

const Proposal = React.lazy(() => import('src/pages/proposal/Proposal'));
const LeaveForm = React.lazy(() => import('src/pages/proposal/LeaveForm'));
const NewLeaveForm = React.lazy(() => import('src/pages/proposal/NewLeaveForm'));

const Remote = React.lazy(() => import('src/pages/proposal/Proposal'));
const RemoteForm = React.lazy(() => import('src/pages/proposal/RemoteForm'));
const NewRemoteForm = React.lazy(() => import('src/pages/proposal/NewRemoteForm'));

const Overtime = React.lazy(() => import('src/pages/proposal/Proposal'));
const OvertimeForm = React.lazy(() => import('src/pages/proposal/OvertimeForm'));
const NewOvertimeForm = React.lazy(() => import('src/pages/proposal/NewOvertimeForm'));

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

const Holiday = React.lazy(() => import('src/pages/setting/holiday/HolidayTabs'));
const NewHoliday = React.lazy(() => import('src/pages/setting/holiday/NewHoliday'));
const EditHoliday = React.lazy(() => import('src/pages/setting/holiday/UpdateHoliday'));
const EditHolidaySetting = React.lazy(() => import('src/pages/setting/holiday/HolidaySettingForm'));

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

const ArticleType = React.lazy(() => import('src/pages/setting/articleType/ArticleType'));
const NewArticleType = React.lazy(() => import('src/pages/setting/articleType/NewType'));
const EditArticleType = React.lazy(() => import('src/pages/setting/articleType/UpdateType'));

const Attribute = React.lazy(() => import('src/pages/setting/attribute/ContractAttribute'));
const NewAttribute = React.lazy(() => import('src/pages/setting/attribute/NewContractAttribute'));
const EditAttribute = React.lazy(() => import('src/pages/setting/attribute/UpdateContractAttribute'));

const SocialInsurance = React.lazy(() => import('src/pages/setting/taxDefine/TaxDefineTabs'));
const NewOtherFee = React.lazy(() => import('src/pages/setting/taxDefine/NewOtherFee'));
const UpdateOtherFee = React.lazy(() => import('src/pages/setting/taxDefine/UpdateOtherFee'));

const routes = [
  { path: ROUTE_PATH.ROOT, exact: true, name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: ROUTE_PATH.DASHBOARD, name: ROUTE_NAME.DASHBOARD, component: Dashboard },
  { path: ROUTE_PATH.COURSE, name: ROUTE_NAME.COURSE, component: Course },

  { path: ROUTE_PATH.ACCOUNT_CREATE, name: ROUTE_NAME.NEW_ACCOUNT, component: NewAccount },
  { path: ROUTE_PATH.ACCOUNT_UPDATE, name: ROUTE_NAME.ACCOUNT_UPDATE, component: EditAccount },
  { path: ROUTE_PATH.ACCOUNT, name: ROUTE_NAME.ACCOUNT, component: Account },

  { path: ROUTE_PATH.NAV_CONTRACT_CREATE, name: ROUTE_NAME.NEW_CONTRACT, component: NewContract },
  { path: ROUTE_PATH.NAV_CONTRACT_UPDATE, name: ROUTE_NAME.CONTRACT_UPDATE, component: EditContract },
  { path: ROUTE_PATH.NAV_CONTRACT, name: ROUTE_NAME.NAV_CONTRACT, component: Contract },

  // { path: ROUTE_PATH.NAV_CONTRACT_CREATE, name: ROUTE_NAME.NEW_CONTRACT, component: NewContract },
  //{ path: ROUTE_PATH.NAV_CONTRACT_UPDATE, name: ROUTE_NAME.CONTRACT_UPDATE, component: EditContract },
  { path: ROUTE_PATH.NAV_BENEFIT, name: ROUTE_NAME.NAV_BENEFIT, component: Benefit },

  { path: ROUTE_PATH.PROFILE_CREATE, name: ROUTE_NAME.NEW_PROFILE, component: NewProfile },
  { path: ROUTE_PATH.PROFILE_LEAVE_REQUEST, name: ROUTE_NAME.PROFILE_REQUEST, component: LeaveForm },

  { path: ROUTE_PATH.PROFILE_UPDATE, name: ROUTE_NAME.PROFILE_UPDATE, component: EditProfile },
  { path: ROUTE_PATH.PROFILE, name: ROUTE_NAME.PROFILE, component: Profile },

  { path: ROUTE_PATH.NEW_LEAVE_REQUEST, name: ROUTE_NAME.NEW_LEAVE_REQUEST, component: NewLeaveForm },
  { path: ROUTE_PATH.LEAVE_REQUEST, name: ROUTE_NAME.LEAVE_REQUEST, component: LeaveForm },
  { path: ROUTE_PATH.LEAVE, name: ROUTE_NAME.PROPOSAL, component: Proposal },

  { path: ROUTE_PATH.NEW_REMOTE_REQUEST, name: ROUTE_NAME.NEW_REMOTE_REQUEST, component: NewRemoteForm },
  { path: ROUTE_PATH.REMOTE_REQUEST, name: ROUTE_NAME.REMOTE_REQUEST, component: RemoteForm },
  { path: ROUTE_PATH.REMOTE, name: ROUTE_NAME.PROPOSAL, component: Remote },

  { path: ROUTE_PATH.NEW_OVERTIME_REQUEST, name: ROUTE_NAME.NEW_OVERTIME_REQUEST, component: NewOvertimeForm },
  { path: ROUTE_PATH.OVERTIME_REQUEST, name: ROUTE_NAME.OVERTIME_REQUEST, component: OvertimeForm },
  { path: ROUTE_PATH.OVERTIME, name: ROUTE_NAME.PROPOSAL, component: Overtime },

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
    name: ROUTE_NAME.NEW_WAGE,
    exact: true,
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

    name: ROUTE_NAME.NEW_ALLOWANCE,
    component: NewAllowance,
  },
  {
    path: ROUTE_PATH.ALLOWANCE_UPDATE,
    name: ROUTE_NAME.ALLOWANCE_UPDATE,
    component: EditAllowance,
  },
  { path: ROUTE_PATH.ALLOWANCE, name: ROUTE_NAME.ALLOWANCE, component: Allowance },
  {
    path: ROUTE_PATH.ARTICLE_TYPE_CREATE,
    exact: true,

    name: ROUTE_NAME.NEW_ARTICLE_TYPE,
    component: NewArticleType,
  },
  {
    path: ROUTE_PATH.ARTICLE_TYPE_UPDATE,
    name: ROUTE_NAME.ARTICLE_TYPE_UPDATE,
    component: EditArticleType,
  },
  { path: ROUTE_PATH.ARTICLE_TYPE, name: ROUTE_NAME.ARTICLE_TYPE, component: ArticleType },
  {
    path: ROUTE_PATH.CONTRACT_ATTRIBUTE_CREATE,
    exact: true,

    name: ROUTE_NAME.NEW_CONTRACT_ATTRIBUTE,
    component: NewAttribute,
  },
  {
    path: ROUTE_PATH.CONTRACT_ATTRIBUTE_UPDATE,
    name: ROUTE_NAME.CONTRACT_ATTRIBUTE_UPDATE,
    component: EditAttribute,
  },
  { path: ROUTE_PATH.CONTRACT_ATTRIBUTE, name: ROUTE_NAME.CONTRACT_ATTRIBUTE, component: Attribute },

  {
    path: ROUTE_PATH.TAX_DETAIL_CREATE,
    name: ROUTE_NAME.NEW_TAX_DETAIL,
    component: NewOtherFee,
  },
  { path: ROUTE_PATH.TAX_DETAIL_UPDATE, name: ROUTE_NAME.TAX_DETAIL_UPDATE, component: UpdateOtherFee },

  { path: ROUTE_PATH.TAX_DETAIL, name: ROUTE_NAME.TAX_DETAIL, component: SocialInsurance },
];

export default routes;
