import { REDUX_STATE } from '../states';

const initialState = {
  accounts: {
    payload: [],
    total: 0,
  },
  account: {
    id: 0,
    username: '',
    password: '',
    email: '',
    phone: '',
    roleId: 0,
    profileId: 0,
    permissionIds: [],
  },
  roles: [],
  permissionGroups: [],
  profiles: [],
  total: 0,
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.account.SET_ACCOUNTS:
      return { ...state, accounts: payload };
    case REDUX_STATE.account.SET_ACCOUNT:
      return { ...state, account: payload };
    case REDUX_STATE.account.DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.account.EMPTY_VALUE:
      return {
        ...state,
        account: initialState.account,
      };
    case REDUX_STATE.account.GET_ROLES:
      return {
        ...state,
        roles: payload,
      };
    case REDUX_STATE.account.GET_ALL_PERMISSION:
      return {
        ...state,
        permissionGroups: payload,
      };
    case REDUX_STATE.account.GET_PERMISSION_ARRAY:
      return {
        ...state,
        account: { ...state.account, permissionIds: payload },
      };

    case REDUX_STATE.account.SET_ROLE:
      return {
        ...state,
        account: { ...state.account, roleId: payload },
      };
    case REDUX_STATE.account.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case REDUX_STATE.account.COUNT_ACCOUNT:
      return { ...state, total: payload };
    default:
      return state;
  }
};

export default accountReducer;
