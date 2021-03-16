import { REDUX_STATE } from '../states';

const initialState = {
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') || '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.user.SET_USER:
      return {
        ...state,
        token: payload.token,
        user: payload.username,
      };
    default:
      return state;
  }
};

export default userReducer;
