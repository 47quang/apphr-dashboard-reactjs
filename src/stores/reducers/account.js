import { REDUX_STATE } from '../states';

const initialState = {
  accounts: [
    //{ id: 1, username: 'admin', email: 'dat@gmail.com', phone: '0212312321312', role: 'Pro', profileId: 1 }
  ],
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
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.account.SET_ACCOUNTS:
      return { ...state, accounts: payload };
    case REDUX_STATE.account.SET_ACCOUNT:
      payload.roleId = payload.roleId ?? 0;
      return { ...state, account: Object.assign({}, state.account, payload) };
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
    default:
      return state;
  }
};

export default accountReducer;
