import { REDUX_STATE } from '../states';

const initialState = {
  accounts: [
    //{ id: 1, username: 'admin', email: 'dat@gmail.com', phone: '0212312321312', role: 'Pro', profileId: 1 }
  ],
  account: {
    id: 0,
    username: '',
    email: '',
    phone: '',
    coefficient: '',
    roleId: 0,
    profileId: 0,
    permissionIds: [],
  },
  roles: [],
  permissionIds: [],
  permissions: [],
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
        permissions: payload,
      };
    case REDUX_STATE.account.GET_PERMISSION_ARRAY:
      return {
        ...state,
        permissionIds: payload,
      };
    case REDUX_STATE.account.SET_ROLE:
      return {
        ...state,
        account: { ...state.account, roleId: payload },
      };
    default:
      return state;
  }
};

export default accountReducer;
