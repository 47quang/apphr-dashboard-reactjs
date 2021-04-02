export const ROUTE_NAME = {
  DASHBOARD: 'Dashboard',
  COURSE: 'Course',
  ACCOUNT: 'Account',
  NEW_ACCOUNT: 'New Account',
  ACCOUNT_UPDATE: 'Account Update',
  PROFILE: 'Profile',
  NEW_PROFILE: 'New Profile',
  NEW_CONTRACT: 'New Contract',
  CONTRACT_UPDATE: 'Contract Update',
  PROFILE_UPDATE: 'Profile Update',
  PROPOSAL: 'Proposal',
  ROLL_UP: 'Roll up',
  NOTIFICATION: 'Notification',
  NEW_NOTIFICATION: 'New Notification',
  NOTIFICATION_UPDATE: 'Notification Update',
  REPORT: 'Report',
  SETTING: 'Setting',
  GENERAL: 'General',
  POSITION: 'Position',
  NEW_POSITION: 'New Position',
  POSITION_UPDATE: 'Position Update',
  SHIFT: 'Shift',
  NEW_SHIFT: 'New Shift',
  SHIFT_UPDATE: 'Shift Update',
  BRANCH: 'Branch',
  NEW_BRANCH: 'New Branch',
  BRANCH_UPDATE: 'Branch Update',
  DEPARTMENT: 'Department',
  NEW_DEPARTMENT: 'New Department',
  DEPARTMENT_UPDATE: 'Department Update',
  HOLIDAY: 'Holiday',
  NEW_HOLIDAY: 'New Holiday',
  HOLIDAY_UPDATE: 'Holiday Update',
  HOLIDAY_SETTINGS_UPDATE: 'Holiday Settings Update',
  PERMISSION: 'Permission',
  PERMISSION_GROUP: 'PermissionGroup',
  ROLE: 'Role',
  NEW_ROLE: 'New Role',
  ROLE_UPDATE: 'Role Update',
  AUTHORIZATION: 'Authorization',
  WAGE: 'Wage',
  NEW_WAGE: 'New Wage',
  WAGE_UPDATE: 'Wage Update',
  ALLOWANCE: 'Allowance',
  NEW_ALLOWANCE: 'New Allowance',
  ALLOWANCE_UPDATE: 'Allowance Update',
};

const ID = '/:id';
const CREATE = '/create';
export const ROUTE_PATH = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  COURSE: '/course',

  ACCOUNT: '/account',
  ACCOUNT_CREATE: '/account' + CREATE,
  ACCOUNT_UPDATE: '/account' + ID,

  PROFILE: '/profile',
  PROFILE_UPDATE: '/profile' + ID,
  PROFILE_CREATE: '/profile' + CREATE,
  CONTRACT: '/profile/contract',
  CONTRACT_CREATE: '/profile/contract/' + CREATE,
  CONTRACT_UPDATE: '/profile/contract/' + ID,

  PROPOSAL: '/proposal',

  ROLL_UP: '/roll-up',

  NOTIFICATION_CREATE: '/notification' + CREATE,
  NOTIFICATION_UPDATE: '/notification' + ID,
  NOTIFICATION: '/notification',

  REPORT: '/report',

  SETTING: '/setting',

  GENERAL: '/setting/general',

  POSITION: '/setting/position',
  POSITION_CREATE: '/setting/position' + CREATE,
  POSITION_UPDATE: '/setting/position' + ID,

  SHIFT: '/setting/shift',
  SHIFT_CREATE: '/setting/shift' + CREATE,
  SHIFT_UPDATE: '/setting/shift' + ID,

  BRANCH: '/setting/branch',
  BRANCH_CREATE: '/setting/branch' + CREATE,
  BRANCH_UPDATE: '/setting/branch' + ID,

  DEPARTMENT: '/setting/department',
  DEPARTMENT_CREATE: '/setting/department' + CREATE,
  DEPARTMENT_UPDATE: '/setting/department' + ID,

  ROLE: '/setting/role',
  ROLE_UPDATE: '/setting/role' + ID,
  ROLE_CREATE: '/setting/role' + CREATE,

  HOLIDAY: '/setting/holiday',
  HOLIDAY_UPDATE_SETTING: '/setting/holiday/tab2:id',
  HOLIDAY_UPDATE: '/setting/holiday/tab1:id',
  HOLIDAY_CREATE: '/setting/holiday' + CREATE,

  WAGE: '/setting/wage',
  WAGE_CREATE: '/setting/wage' + CREATE,
  WAGE_UPDATE: '/setting/wage' + ID,

  ALLOWANCE: '/setting/allowance',
  ALLOWANCE_CREATE: '/setting/allowance' + CREATE,
  ALLOWANCE_UPDATE: '/setting/allowance' + ID,
  ARTICLE_TYPE: '/setting/articleType',
  ARTICLE_TYPE_CREATE: '/setting/articleType' + CREATE,
  ARTICLE_TYPE_UPDATE: '/setting/articleType' + ID,
};

export const CONTACT_TYPE = {
  SKYPE: 'skype',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  ZALO: 'zalo',
};
