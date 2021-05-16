export const ROUTE_NAME = {
  DASHBOARD: 'Dashboard',
  COURSE: 'Course',
  ACCOUNT: 'Account',
  NEW_ACCOUNT: 'New Account',
  ACCOUNT_UPDATE: 'Account Update',
  PROFILE: 'Profile',
  NEW_PROFILE: 'New Profile',
  NEW_CONTRACT: 'New Contract',
  PROFILE_REQUEST: 'Proposal',
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
  COMPANY_INFO: 'Company Info',
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
  ARTICLE_TYPE: 'Article Type',
  NEW_ARTICLE_TYPE: 'New Article Type',
  ARTICLE_TYPE_UPDATE: ' Article Type Update',

  LEAVE: 'Leave',
  LEAVE_REQUEST: 'Leave Request',
  NEW_LEAVE_REQUEST: 'New Leave Request',

  REMOTE: 'Remote',
  REMOTE_REQUEST: 'Remote Request',
  NEW_REMOTE_REQUEST: 'New Remote Request',

  OVERTIME: 'Overtime',
  OVERTIME_REQUEST: 'Overtime Request',
  NEW_OVERTIME_REQUEST: 'New Overtime Request',

  CONTRACT_ATTRIBUTE: 'Contract Attribute',
  NEW_CONTRACT_ATTRIBUTE: 'New Contract Attribute',
  CONTRACT_ATTRIBUTE_UPDATE: 'Contract Attribute Update',

  TAX_DETAIL: 'Tax Define',
  NEW_TAX_DETAIL: 'New Tax Detail',
  TAX_DETAIL_UPDATE: 'Tax Detail Update',

  CONTRACT: 'Contract Settings',
};

const ID = '/:id';
const CREATE = '/create';
export const ROUTE_PATH = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  COURSE: '/course',
  PAGE_404: '/404',

  ACCOUNT: '/account',
  ACCOUNT_CREATE: '/account' + CREATE,
  ACCOUNT_UPDATE: '/account' + ID,

  PROFILE: '/profile',
  PROFILE_UPDATE: '/profile' + ID,
  PROFILE_CREATE: '/profile' + CREATE,
  CONTRACT: '/profile/contract',
  CONTRACT_CREATE: '/profile/contract/' + CREATE,
  CONTRACT_UPDATE: '/profile/contract/' + ID,
  PROFILE_LEAVE_REQUEST: '/profile' + ID + '/leave.id=:id',
  PROFILE_REMOTE_REQUEST: '/profile' + ID + '/remote.id=:id',
  PROFILE_OVERTIME_REQUEST: '/profile' + ID + '/overtime.id=:id',

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

  LEAVE: '/proposal/leave',
  LEAVE_REQUEST: '/proposal/leave/leave.id=:id',
  NEW_LEAVE_REQUEST: '/proposal/leave/leave.id=create',

  REMOTE: '/proposal/remote',
  REMOTE_REQUEST: '/proposal/remote/remote.id=:id',
  NEW_REMOTE_REQUEST: '/proposal/remote/remote.id=create',

  OVERTIME: '/proposal/overtime',
  OVERTIME_REQUEST: '/proposal/overtime/overtime.id=:id',
  NEW_OVERTIME_REQUEST: '/proposal/overtime/overtime.id=create',

  CONTRACT_ATTRIBUTE: '/setting/attribute',
  CONTRACT_ATTRIBUTE_CREATE: '/setting/attribute' + CREATE,
  CONTRACT_ATTRIBUTE_UPDATE: '/setting/attribute' + ID,

  TAX_DETAIL: '/setting/taxDefine',
  TAX_DETAIL_CREATE: '/setting/taxDefine' + CREATE,
  TAX_DETAIL_UPDATE: '/setting/taxDefine' + ID,
};

export const CONTACT_TYPE = {
  SKYPE: 'skype',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  ZALO: 'zalo',
};
export const RESPONSE_CODE = {
  ///The server cannot or will not process the request due to an
  ///apparent client error
  CE_BAD_REQUEST: 400,

  ///Similar to 403 Forbidden, but specifically for use when
  ///authentication is required and has failed or has not yet been
  ///provided. The user does not have the necessary credentials
  CE_UNAUTHORIZED: 401,

  ///The request was a valid request, but the server is refusing to
  ///respond to it. The user might be logged in but does not have
  ///the necessary permissions for the resource.
  CE_FORBIDDEN: 403,

  ///The requested resource could not be found but may be
  ///available in the future.
  CE_NOT_FOUND: 404,

  ///The requested resource is capable of generating only
  ///content not acceptable according to the Accept headers sent
  ///in the request
  CE_NOT_ACCEPTABLE: 406,

  ///The server timed out waiting for the request.
  CE_REQUEST_TIME_OUT: 408,

  ///A generic error message, given when an unexpected
  ///condition was encountered and no more specific message is
  ///suitable
  ///500
  SE_INTERNAL_SERVER_ERROR: 500,

  ///The server either does not recognize the request method, or
  ///it lacks the ability to fulfill the request. Usually this implies
  ///future availability
  SE_NOT_IMPLEMENTED: 501,

  ///The server was acting as a gateway or proxy and received an
  ///invalid response from the upstream server
  SE_BAD_GATEWAY: 502,

  ///ResponseCode = 200
  ///Standard response for successful HTTP requests
  SUCCESS_OK: 200,

  ///ResponseCode = 201
  ///The request has been fulfilled, resulting in the creation of a new resource
  SUCCESS_CREATED: 201,

  ///ResponseCode = 202
  ///The request has been accepted for processing, but the processing
  ///has not been completed
  SUCCESS_ACCEPTED: 202,

  ///ResponseCode = 204
  ///The server successfully processed the request and is not
  ///returning any content
  SUCCESS_NO_CONTENT: 204,
};
export const PERMISSION = {
  // branch
  CREATE_BRANCH: 11,
  LIST_BRANCH: 12,
  GET_BRANCH: 13,
  UPDATE_BRANCH: 14,
  DELETE_BRANCH: 15,

  // department
  CREATE_DEPARTMENT: 16,
  LIST_DEPARTMENT: 17,
  GET_DEPARTMENT: 18,
  UPDATE_DEPARTMENT: 20,
  DELETE_DEPARTMENT: 19,

  // position
  CREATE_POSITION: 21,
  LIST_POSITION: 22,
  GET_POSITION: 23,
  UPDATE_POSITION: 24,
  DELETE_POSITION: 25,

  // shift
  CREATE_SHIFT: 26,
  LIST_SHIFT: 30,
  GET_SHIFT: 29,
  UPDATE_SHIFT: 27,
  DELETE_SHIFT: 28,

  // holiday
  CREATE_HOLIDAY: 35,
  LIST_HOLIDAY: 34,
  GET_HOLIDAY: 33,
  UPDATE_HOLIDAY: 31,
  DELETE_HOLIDAY: 32,

  // profile
  CREATE_PROFILE: 36,
  LIST_PROFILE: 37,
  GET_PROFILE: 38,
  UPDATE_PROFILE: 39,
  DELETE_PROFILE: 40,

  // user
  CREATE_USER: 42,
  LIST_USER: 41,
  GET_USER: 44,
  UPDATE_USER: 43,
  DELETE_USER: 45,

  // general
  UPDATE_GENERAL: 46,

  // role
  CREATE_ROLE: 47,
  LIST_ROLE: 48,
  GET_ROLE: 49,
  // UPDATE_ROLE : 43,
  DELETE_ROLE: 50,

  // article
  CREATE_ARTICLE: 62,
  LIST_ARTICLE: 63,
  GET_ARTICLE: 64,
  UPDATE_ARTICLE: 65,
  DELETE_ARTICLE: 61,

  // type article
  CREATE_TYPE_ARTICLE: 72,
  LIST_TYPE_ARTICLE: 74,
  GET_TYPE_ARTICLE: 73,
  UPDATE_TYPE_ARTICLE: 76,
  DELETE_TYPE_ARTICLE: 75,

  // wage
  CREATE_WAGE: 78,
  LIST_WAGE: 81,
  GET_WAGE: 80,
  UPDATE_WAGE: 77,
  DELETE_WAGE: 79,

  // allowance
  CREATE_ALLOWANCE: 82,
  LIST_ALLOWANCE: 84,
  GET_ALLOWANCE: 83,
  UPDATE_ALLOWANCE: 86,
  DELETE_ALLOWANCE: 85,

  // wage history
  CREATE_WAGE_HISTORY: 90,
  LIST_WAGE_HISTORY: 87,
  GET_WAGE_HISTORY: 89,
  UPDATE_WAGE_HISTORY: 88,
  DELETE_WAGE_HISTORY: 91,

  // contact
  CREATE_CONTACT: 92,
  LIST_CONTACT: 95,
  UPDATE_CONTACT: 93,
  DELETE_CONTACT: 94,

  // diploma
  CREATE_DIPLOMA: 96,
  LIST_DIPLOMA: 98,
  GET_DIPLOMA: 97,
  UPDATE_DIPLOMA: 99,
  DELETE_DIPLOMA: 100,

  // roll up
  LIST_ROLL_UP: 102,
  GET_ROLL_UP: 101,
  DELETE_ROLL_UP: 103,

  // leave-form
  CREATE_LEAVE_FORM: 111,
  LIST_LEAVE_FORM: 112,
  GET_LEAVE_FORM: 113,
  UPDATE_LEAVE_FORM: 114,
  DELETE_LEAVE_FORM: 115,
  APPROVE_LEAVE_FORM: 116,
  REJECT_LEAVE_FORM: 116,

  // overtime-form
  CREATE_OVERTIME_FORM: 118,
  LIST_OVERTIME_FORM: 122,
  GET_OVERTIME_FORM: 121,
  UPDATE_OVERTIME_FORM: 120,
  DELETE_OVERTIME_FORM: 119,
  APPROVE_OVERTIME_FORM: 123,
  REJECT_OVERTIME_FORM: 124,

  // remote-form
  CREATE_REMOTE_FORM: 131,
  LIST_REMOTE_FORM: 126,
  GET_REMOTE_FORM: 127,
  UPDATE_REMOTE_FORM: 129,
  DELETE_REMOTE_FORM: 125,
  APPROVE_REMOTE_FORM: 128,
  REJECT_REMOTE_FORM: 130,

  //contract
  CREATE_CONTRACT: 137,
  LIST_CONTRACT: 138,
  UPDATE_CONTRACT: 139,
  DELETE_CONTRACT: 140,
  GET_CONTRACT: 141,
  ACTIVE_CONTRACT: 143,
  INACTIVE_CONTRACT: 142,

  //history working
  CREATE_WORK_HISTORY: 132,
  GET_WORK_HISTORY: 133,
  LIST_WORK_HISTORY: 134,
  UPDATE_WORK_HISTORY: 135,
  DELETE_WORK_HISTORY: 136,

  //assignment
  LIST_ASSIGNMENT: 148,
  CREATE_ASSIGNMENT: 145,
  GET_ASSIGNMENT: 146,
  DELETE_ASSIGNMENT: 147,
  CHECK_IN: 149,
  CHECK_OUT: 150,
};

export const PROFILE_TABS = {
  PROFILE: 0,
  SCHEDULER: 1,
  REQUEST: 2,
  STATISTIC: 3,
};
export const PROFILE_SUB_TABS = {
  BASIC_INFO: 0,
  HISTORY_WORKING: 1,
  CONTRACT: 2,
  BENEFIT: 3,
  ACADEMIC_LEVEL: 4,
  CERTIFICATE: 5,
  ADDRESS_INFO: 6,
  OTHER_INFO: 7,
};

export const REQUEST_TABS = {
  LEAVE_REQUEST: 0,
  REMOTE_REQUEST: 1,
  OVERTIME_REQUEST: 2,
};

export const PAGE_SIZES = {
  LEVEL_1: 10,
  LEVEL_2: 20,
  LEVEL_3: 50,
};

export const FILTER_OPERATOR = {
  IN: 'in',
  NOT_IN: 'not_in',
  BETWEEN: 'between',
  NOT_BETWEEN: 'not_between',
  NULL: 'null',
  NOT_NULL: 'not_null',
  EMPTY: 'empty',
  NOT_EMPTY: 'not_empty',
  AUTOCOMPLETE: 'autocomplete',
  GREATER_THAN: '>',
  GREATER_THAN_OR_EQUAL: '>=',
  LESS_THAN: '<',
  LESS_THAN_OR_EQUAL: '<=',
  EQUAL: '=',
  NOT_EQUAL: '!=',
  LIKE: 'like',
  NOT_LIKE: 'not_like',
  CONTAIN: 'contain',
  CUSTOM: 'custom',
};
