import {REDUX_STATE} from '../states/index'
export const changeActions = (payload) => {
  return {
    type: REDUX_STATE.header.CHANGE_ACTIONS,
    payload,
  };
};
