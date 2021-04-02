import { ROUTE_NAME, ROUTE_PATH } from 'src/constants/key';

const _nav = [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Education'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.COURSE,
    to: ROUTE_PATH.COURSE,
    icon: 'cil-newspaper',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Timekeeping'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.ROLL_UP,
    to: ROUTE_PATH.ROLL_UP,
    icon: 'cil-touch-app',
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.PROPOSAL,
    to: ROUTE_PATH.PROPOSAL,
    icon: 'cil-description',
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.PROFILE,
    to: ROUTE_PATH.PROFILE,
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.ACCOUNT,
    to: ROUTE_PATH.ACCOUNT,
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.NOTIFICATION,
    to: ROUTE_PATH.NOTIFICATION,
    icon: 'cil-bell',
  },
  {
    _tag: 'CSidebarNavItem',
    name: ROUTE_NAME.REPORT,
    to: ROUTE_PATH.REPORT,
    icon: 'cil-print',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: ROUTE_NAME.SETTING,
    route: ROUTE_PATH.SETTING,
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.GENERAL,
        to: ROUTE_PATH.GENERAL,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.BRANCH,
        to: ROUTE_PATH.BRANCH,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.DEPARTMENT,
        to: ROUTE_PATH.DEPARTMENT,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.POSITION,
        to: ROUTE_PATH.POSITION,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.SHIFT,
        to: ROUTE_PATH.SHIFT,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.HOLIDAY,
        to: ROUTE_PATH.HOLIDAY,
      },

      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.ROLE,
        to: ROUTE_PATH.ROLE,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.WAGE,
        to: ROUTE_PATH.WAGE,
      },
      {
        _tag: 'CSidebarNavItem',
        name: ROUTE_NAME.ALLOWANCE,
        to: ROUTE_PATH.ALLOWANCE,
      },
      // {
      //   _tag: "CSidebarNavDropdown",
      //   name: ROUTE_NAME.AUTHORIZATION,
      //   route: "/setting/authorization",
      //   _children: [
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: ROUTE_NAME.PERMISSION,
      //       to: "/setting/authorization/permission",
      //     },
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: ROUTE_NAME.PERMISSION_GROUP,
      //       to: "/setting/authorization/permission-group",
      //     },
      //   ],
      // },
    ],
  },
];

export default _nav;
