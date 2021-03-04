import React from 'react';
import { ROUTE_NAME } from '../constants/key';



const Dashboard = React.lazy(() => import('src/pages/dashboard/Dashboard'));
const Course = React.lazy(() => import('src/pages/course/Course'));
const Account = React.lazy(() => import('src/pages/account/Account'));
const Profile = React.lazy(() => import('src/pages/profile/Profile'));
const Proposal = React.lazy(() => import('src/pages/proposal/Proposal'));
const RollUp = React.lazy(() => import('src/pages/roll-up/RollUp'));
const Notification = React.lazy(() => import('src/pages/notification/Notification'));
const Report = React.lazy(() => import('src/pages/report/Report'));
const General = React.lazy(() => import('src/pages/setting/general/General'));
const Position = React.lazy(() => import('src/pages/setting/position/Position'));
const Shift = React.lazy(() => import('src/pages/setting/shift/Shift'));
const NewShift = React.lazy(() => import('src/pages/setting/shift/NewShift'));
const Department = React.lazy(() => import('src/pages/setting/department/Department'));
const Branch = React.lazy(() => import('src/pages/setting/branch/Branch'));
const Permission = React.lazy(() => import('src/pages/setting/authorization/permission/Permission'));
const PermissionGroup = React.lazy(() => import('src/pages/setting/authorization/permission-group/PermissionGroup'));
const Role = React.lazy(() => import('src/pages/setting/authorization/role/Role'));


const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/course', name: 'Course', component: Course },
  { path: '/account', name: 'Account', component: Account },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/proposal', name: 'Proposal', component: Proposal },
  { path: '/roll-up', name: 'RollUp', component: RollUp },
  { path: '/notification', name: 'Notification', component: Notification },
  { path: '/report', name: 'Report', component: Report },
  { path: '/setting', exact: true, name: ROUTE_NAME.SETTING, component: General },
  { path: '/setting/general', name: 'General', component: General },
  { path: '/setting/position', name: 'Position', component: Position },
  { path: '/setting/shift/newShift', name: ROUTE_NAME.NEW_SHIFT, component: NewShift },
  { path: '/setting/shift', name: 'Shift', component: Shift },
  { path: '/setting/branch', name: 'Branch', component: Branch },
  { path: '/setting/department', name: 'Department', component: Department },
  { path: '/setting/authorization', exact: true, name: 'Permission', component: Permission },
  { path: '/setting/authorization/permission', name: 'Permission', component: Permission },
  { path: '/setting/authorization/permission-group', name: 'PermissionGroup', component: PermissionGroup },
  { path: '/setting/authorization/role', name: 'Role', component: Role },
];

export default routes;
