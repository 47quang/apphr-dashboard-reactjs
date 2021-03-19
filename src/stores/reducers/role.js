import { REDUX_STATE } from '../states';

const initialState = {
  roles: [],
  role: {
    id: '',
    name: '',
    permissions: [],
  },
  permissions: [],
};
const handlePayload = (payload) => {
  payload.permissions = payload.permissions.map((per) => per.id);
  return payload;
};

const roleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.role.SET_ROLES:
      return { ...state, roles: payload };
    case REDUX_STATE.role.SET_ROLE:
      payload = handlePayload(payload);
      return { ...state, role: payload };
    case REDUX_STATE.role.DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.role.EMPTY_VALUE:
      return {
        ...state,
        role: initialState.role,
      };
    case REDUX_STATE.role.SET_PERMISSIONS:
      return {
        ...state,
        permissions: payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
