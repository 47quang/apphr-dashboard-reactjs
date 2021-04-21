import { combineReducers } from 'redux';
import branchReducer from './branch';
import headerReducer from './header';
import locationReducer from './location';
import settingReducer from './setting';
import shiftReducer from './shift';
import styleReducer from './style';
import userReducer from './user';
import positionReducer from './position';
import departmentReducer from './department';
import holidayReducer from './holiday';
import accountReducer from './account';
import roleReducer from './role';
import profileReducer from './profile';
import notificationReducer from './notification';
import contractReducer from './contract';
import wageReducer from './wage';
import allowanceReducer from './allowance';
import articleReducer from './article';
import articleTypeReducer from './articleType';
import historyWorkReducer from './historyWork';
import rollUpReducer from './rollUp';
import assignmentReducer from './assignment';
import requestReducer from './request';

export default combineReducers({
  style: styleReducer,
  user: userReducer,
  header: headerReducer,
  location: locationReducer,
  branch: branchReducer,
  setting: settingReducer,
  shift: shiftReducer,
  position: positionReducer,
  department: departmentReducer,
  holiday: holidayReducer,
  account: accountReducer,
  role: roleReducer,
  profile: profileReducer,
  notification: notificationReducer,
  contract: contractReducer,
  wage: wageReducer,
  allowance: allowanceReducer,
  article: articleReducer,
  articleType: articleTypeReducer,
  historyWork: historyWorkReducer,
  rollUp: rollUpReducer,
  assignment: assignmentReducer,
  request: requestReducer,
});
