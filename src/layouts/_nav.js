import { ROUTE_NAME } from "src/constants/key";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Education"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Course",
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
    name: "Roll up",
    to: "/roll-up",
    icon: "cil-touch-app",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Proposal",
    to: "/proposal",
    icon: "cil-description",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    to: "/profile",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Account",
    to: "/account",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notification",
    to: "/notification",
    icon: "cil-bell",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Report",
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
        name: "Shift",
        to: "/setting/shift",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Holiday",
        to: "/setting/holiday",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Branch",
        to: "/setting/branch",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Department",
        to: "/setting/department",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Position",
        to: "/setting/position",
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Authorization",
        route: "/setting/authorization",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Role",
            to: "/setting/authorization/role",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Permission",
            to: "/setting/authorization/permission",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Permission group",
            to: "/setting/authorization/permission-group",
          },
        ],
      },
    ],
  },
];

export default _nav;
