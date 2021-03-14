import { combineReducers } from "redux";
import styleReducer from "./style";
import userReducer from "./user";
import accountReducer from "./account";
import headerReducer from "./header";
import locationReducer from "./location";
import generalReducer from "./general";

export default combineReducers({
  style: styleReducer,
  user: userReducer,
  account: accountReducer,
  header: headerReducer,
  location: locationReducer,
  general: generalReducer,
});
