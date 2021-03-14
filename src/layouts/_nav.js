import { ROUTE_NAME } from "src/constants/key";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Education"],
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.COURSE,
    to: "/course",
    icon: "cil-newspaper",
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
    _tag: "CSidebarNavTitle",
    _children: ["Timekeeping"],
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.ROLL_UP,
    to: "/roll-up",
    icon: "cil-touch-app",
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.PROPOSAL,
    to: "/proposal",
    icon: "cil-description",
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.PROFILE,
    to: "/profile",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.ACCOUNT,
    to: "/account",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.NOTIFICATION,
    to: "/notification",
    icon: "cil-bell",
  },
  {
    _tag: "CSidebarNavItem",
    name: ROUTE_NAME.REPORT,
    to: "/report",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: ROUTE_NAME.SETTING,
    route: "/setting",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.GENERAL,
        to: "/setting/general",
      },
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.SHIFT,
        to: "/setting/shift",
      },
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.HOLIDAY,
        to: "/setting/holiday",
      },
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.BRANCH,
        to: "/setting/branch",
      },
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.DEPARTMENT,
        to: "/setting/department",
      },
      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.POSITION,
        to: "/setting/position",
      },

      {
        _tag: "CSidebarNavItem",
        name: ROUTE_NAME.ROLE,
        to: "/setting/role",
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
