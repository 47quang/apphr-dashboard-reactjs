import { combineReducers } from 'redux';
import styleReducer from './style';
import userReducer from './user';
import accountReducer from './account';

export default combineReducers({
  style: styleReducer,
  user: userReducer,
  account: accountReducer
});
