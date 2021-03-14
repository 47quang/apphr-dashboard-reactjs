import { combineReducers } from "redux";
import accountReducer from "./account";
import branchReducer from "./branch";
import headerReducer from "./header";
import locationReducer from "./location";
import settingReducer from "./setting";
import shiftReducer from "./shift";
import styleReducer from "./style";
import userReducer from "./user";
import positionReducer from "./position";

export default combineReducers({
  style: styleReducer,
  user: userReducer,
  account: accountReducer,
  header: headerReducer,
  location: locationReducer,
  branch: branchReducer,
  setting: settingReducer,
  shift: shiftReducer,
  position: positionReducer,
});
