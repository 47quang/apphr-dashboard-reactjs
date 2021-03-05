import { SET_ACCOUNT } from "../actions/account";

const initialState = {
  accounts: [],
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default accountReducer;
