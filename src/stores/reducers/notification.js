import { REDUX_STATE } from '../states';

const initialState = {
  open: false,
  type: '',
  message: '',
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.notification.SET_NOTI:
      return { ...state, ...payload };
    case REDUX_STATE.notification.SET_OPEN:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default notificationReducer;
