import { REDUX_STATE } from '../states';

const initialState = {
  payments: {
    payload: [],
    total: 0,
  },
  payment: {
    code: '',
    name: '',
    type: '',
    by: '',
    value: '',
  },
};

const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.payment.SET_PAYMENTS:
      return { ...state, payments: payload };
    case REDUX_STATE.payment.SET_PAYMENT:
      return { ...state, payment: payload };
    case REDUX_STATE.payment.DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.payment.EMPTY_VALUE:
      return {
        ...state,
        payment: initialState.payment,
      };
    case REDUX_STATE.payment.EMPTY_LIST:
      return {
        ...state,
        payments: initialState.payments,
      };
    default:
      return state;
  }
};

export default paymentReducer;
