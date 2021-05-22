export const REDUX_STATE = {
  login: {
    SET_TOKEN: 'SET_TOKEN',
    GET_TOKEN: 'GET_TOKEN',
    LOG_OUT: 'LOG_OUT',
  },
  location: {
    SET_PROVINCES: 'SET_PROVINCES',
    SET_DISTRICTS: 'SET_DISTRICTS',
    SET_WARDS: 'SET_WARDS',
  },
  setting: {
    SET_GENERAL: 'SET_GENERAL',
  },

  shift: {
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_SHIFT: 'GET_SHIFT',
    SET_SHIFT: 'SET_SHIFT',
    GET_SHIFTS: 'GET_SHIFTS',
    DELETE_SHIFT: 'DELETE_SHIFT',
    RESET_SHIFTS: 'RESET_SHIFTS',
  },

  branch: {
    SET_BRANCHES: 'SET_BRANCHES',
    SET_BRANCH: 'SET_BRANCH',
    GET_BRANCH: 'GET_BRANCH',
    GET_BRANCHES: 'GET_BRANCHES',
    DELETE_BRANCH: 'DELETE_BRANCH',
    EMPTY_VALUE: 'EMPTY_VALUE',
    COUNT_BRANCHES: 'COUNT_BRANCHES',
  },

  department: {
    SET_DEPARTMENTS: 'SET_DEPARTMENTS',
    SET_DEPARTMENT: 'SET_DEPARTMENT',
    DELETE_DEPARTMENT: 'DELETE_DEPARTMENT',
    RESET_DEPARTMENT: 'RESET_DEPARTMENT',
    COUNT_DEPARTMENTS: 'COUNT_DEPARTMENTS',
  },

  position: {
    GET_POSITION: 'GET_POSITION',
    UPDATE_POSITION: 'UPDATE_NEW_POSITION',
    GET_POSITIONS: 'GET_POSITIONS',
    DELETE_POSITION: 'DELETE_POSITION',
    EMPTY_VALUE: 'EMPTY_VALUE',
    SET_DELETED_BRANCH_ID: 'SET_DELETED_BRANCH_ID',
  },
  style: {
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    CHANGE_SIDE_BAR_SHOW: 'CHANGE_SIDE_BAR_SHOW',
  },
  header: {
    CHANGE_ACTIONS: 'CHANGE_ACTIONS',
  },
  holiday: {
    SET_HOLIDAYS: 'SET_HOLIDAYS',
    SET_HOLIDAY: 'SET_HOLIDAY',
    GET_HOLIDAY: 'GET_HOLIDAY',
    GET_HOLIDAYS: 'GET_HOLIDAYS',
    DELETE_HOLIDAY: 'DELETE_HOLIDAY',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_REQUESTS: 'GET_REQUESTS',
    GET_REQUEST: 'GET_REQUEST',
    SET_POLICY: 'SET_POLICY',
  },
  user: {
    SET_USER: 'SET_USER',
  },
  account: {
    SET_ACCOUNTS: 'SET_ACCOUNTS',
    SET_ACCOUNT: 'SET_ACCOUNT',
    GET_ACCOUNT: 'GET_ACCOUNT',
    GET_ACCOUNTS: 'GET_ACCOUNTS',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_ROLES: 'GET_ROLES',
    GET_PERMISSION_ARRAY: 'GET_PERMISSION_ARRAY',
    GET_ALL_PERMISSION: 'GET_ALL_PERMISSION',
    SET_ROLE: 'SET_ROLE',
    GET_PROFILES: 'GET_PROFILES',
    COUNT_ACCOUNT: 'COUNT_ACCOUNT',
  },
  role: {
    SET_ROLES: 'SET_ROLES',
    SET_ROLE: 'SET_ROLE',
    GET_ROLE: 'GET_ROLE',
    GET_ROLES: 'GET_ROLES',
    DELETE_ROLE: 'DELETE_ROLE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    SET_PERMISSIONS: 'SET_PERMISSIONS',
  },
  profile: {
    SET_PROFILES: 'SET_PROFILES',
    SET_PROFILE: 'SET_PROFILE',
    DELETE_PROFILE: 'DELETE_PROFILE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    EMPTY_LIST: 'EMPTY_LIST',
    GET_ROLES: 'GET_ROLES',
    SET_TAB_NAME: 'SET_TAB_NAME',
    SET_SUB_TAB_NAME: 'SET_SUB_TAB_NAME',
    SET_JOB_TIMELINE: 'SET_JOB_TIMELINE',
    SET_ACADEMIC_LEVEL: 'SET_ACADEMIC_LEVEL',
    SET_CERTIFICATE_INFO: 'SET_CERTIFICATE_INFO',
    SET_ADDRESS_INFO: 'SET_ADDRESS_INFO',
    SET_SALARY_ALLOWANCE: 'SET_SALARY_ALLOWANCE',
    SET_DIFFERENCE_INFO: 'SET_SALARY_ALLOWANCE',
    GET_CONTACTS: 'GET_CONTACTS',
    SET_CONTACTS: 'SET_CONTACTS',
    CREATE_NEW_CONTACTS: 'CREATE_NEW_CONTACTS',
    UPDATE_CONTACT: 'UPDATE_CONTACT',
  },
  notification: {
    SET_NOTI: 'SET_NOTI',
    SET_OPEN: 'SET_OPEN',
  },
  contract: {
    SET_CONTRACTS: 'SET_CONTRACTS',
    SET_CONTRACT: 'SET_CONTRACT',
    UPDATE_CONTRACT: 'UPDATE_CONTRACT',
    DELETE_CONTRACT: 'DELETE_CONTRACT',
    EMPTY_LIST_CONTRACT: 'EMPY_LIST_CONTRACT',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_BRANCHES: 'GET_BRANCHES',
    GET_WAGES: 'GET_WAGES',
    GET_ALLOWANCES: 'GET_ALLOWANCES',
    SET_BENEFITS: 'SET_BENEFITS',
    CREATE_CONTRACT: 'CREATE_CONTRACT',
    COUNT_ACTIVE_CONTRACT: 'COUNT_ACTIVE_CONTRACT',
  },
  diploma: {
    SET_DIPLOMAS: 'SET_DIPLOMAS',
    SET_DIPLOMA: 'SET_DIPLOMA',
    UPDATE_DIPLOMA: 'UPDATE_DIPLOMA',
    SET_DEGREES: 'SET_DEGREES',
    SET_CERTIFICATES: 'SET_CERTIFICATES',
    DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
    DELETE_DEGREE: 'DELETE_DEGREE',
    EMPTY_DEGREE: 'EMPTY_DEGREE',
    EMPTY_CERTIFICATE: 'EMPTY_CERTIFICATE',
  },
  wage: {
    SET_WAGES: 'SET_WAGES',
    SET_WAGE: 'SET_WAGE',
    DELETE_WAGE: 'DELETE_WAGE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    EMPTY_LIST: 'EMPTY_LIST',
  },
  wageHistory: {
    SET_WAGE_HISTORIES: 'SET_WAGE_HISTORIES',
    SET_WAGE_HISTORY: 'SET_WAGE_HISTORY',
    DELETE_WAGE_HISTORY: 'DELETE_WAGE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    EMPTY_LIST: 'EMPTY_LIST',
  },
  allowance: {
    SET_ALLOWANCES: 'SET_ALLOWANCES',
    SET_ALLOWANCE: 'SET_ALLOWANCE',
    DELETE_ALLOWANCE: 'DELETE_ALLOWANCE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    EMPTY_LIST: 'EMPTY_LIST',
  },
  article: {
    SET_ARTICLES: 'SET_ARTICLES',
    SET_ARTICLE: 'SET_ARTICLE',
    DELETE_ARTICLE: 'DELETE_ARTICLE',
    EMPTY_VALUE: 'EMPTY_VALUE',
  },
  articleType: {
    SET_TYPES: 'SET_TYPES',
    SET_TYPE: 'SET_TYPE',
    DELETE_TYPE: 'DELETE_TYPE',
    EMPTY_VALUE: 'EMPTY_VALUE',
  },

  historyWork: {
    SET_HISTORIES: 'SET_HISTORIES',
    CREATE_HISTORY: 'CREATE_HISTORY',
    UPDATE_HISTORY: 'UPDATE_HISTORY',
    DELETE_HISTORY: 'DELETE_HISTORY',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_DEPARTMENTS: 'GET_DEPARTMENTS',
    SET_POSITIONS: 'SET_POSITIONS',
  },
  rollUp: {
    GET_ROLLUP: 'GET_ROLLUP',
    GET_HISTORIES: 'GET_HISTORIES',
  },
  assignment: {
    SET_ASSIGNMENTS: 'SET_ASSIGNMENTS',
    SET_ASSIGNMENT: 'SET_ASSIGNMENT',
    CREATE_ASSIGNMENT: 'CREATE_ASSIGNMENT',
    DELETE_ASSIGNMENT: 'DELETE_ASSIGNMENT',
    EMPTY_VALUE: 'EMPTY_VALUE',
    EMPTY_ASSIGNMENT: 'EMPTY_ASSIGNMENT',
    SET_ASSIGNMENT_IN_A_DATE: 'SET_ASSIGNMENT_IN_A_DATE',
    EMPTY_ASSIGNMENT_IN_A_DATE: 'EMPTY_ASSIGNMENT_IN_A_DATE',
  },
  leaveReq: {
    SET_LEAVE_REQUESTS: 'SET_LEAVE_REQUESTS',
    SET_LEAVE_REQUEST: 'SET_LEAVE_REQUEST',
    DELETE_REQUEST: 'DELETE_LEAVE_REQUEST',
    EMPTY_LIST_LEAVE_REQUEST: 'EMPTY_LIST_LEAVE_REQUEST',
    EMPTY_FORM_LEAVE_REQUEST: 'EMPTY_FORM_LEAVE_REQUEST',
    COUNT_LEAVE_REQUESTS: 'COUNT_LEAVE_REQUESTS',
  },
  remoteReq: {
    SET_REMOTE_REQUESTS: 'SET_REMOTE_REQUESTS',
    SET_REMOTE_REQUEST: 'SET_REMOTE_REQUEST',
    DELETE_REQUEST: 'DELETE_REMOTE_REQUEST',
    EMPTY_LIST_REMOTE_REQUEST: 'EMPTY_LIST_REMOTE_REQUEST',
    EMPTY_FORM_REMOTE_REQUEST: 'EMPTY_FORM_REMOTE_REQUEST',
    COUNT_REMOTE_REQUESTS: 'COUNT_REMOTE_REQUESTS',
  },
  overtimeReq: {
    SET_OVERTIME_REQUESTS: 'SET_OVERTIME_REQUESTS',
    SET_OVERTIME_REQUEST: 'SET_OVERTIME_REQUEST',
    DELETE_REQUEST: 'DELETE_OVERTIME_REQUEST',
    EMPTY_LIST_OVERTIME_REQUEST: 'EMPTY_LIST_OVERTIME_REQUEST',
    EMPTY_FORM_OVERTIME_REQUEST: 'EMPTY_FORM_OVERTIME_REQUEST',
    COUNT_OVERTIME_REQUESTS: 'COUNT_OVERTIME_REQUESTS',
  },
  attribute: {
    SET_ATTRIBUTES: 'SET_ATTRIBUTES',
    SET_ATTRIBUTE: 'SET_ATTRIBUTE',
    DELETE_ATTRIBUTE: 'DELETE_ATTRIBUTE',
    EMPTY_VALUE: 'EMPTY_VALUE',
  },
  payment: {
    SET_PAYMENTS: 'SET_PAYMENTS',
    SET_PAYMENT: 'SET_PAYMENT',
    DELETE_PAYMENT: 'DELETE_PAYMENT',
    EMPTY_VALUE: 'EMPTY_VALUE',
  },
  dashboard: {
    COUNT_BRANCHES: 'COUNT_BRANCHES',
    COUNT_DEPARTMENTS: 'COUNT_DEPARTMENTS',
    COUNT_LEAVE_REQUESTS: 'COUNT_LEAVE_REQUESTS',
    COUNT_REMOTE_REQUESTS: 'COUNT_REMOTE_REQUESTS',
    COUNT_OVERTIME_REQUESTS: 'COUNT_OVERTIME_REQUESTS',
  },
  log: {
    SET_LOGS: 'SET_LOGS',
    EMPTY_LIST: 'EMPTY_LIST',
  },
};
