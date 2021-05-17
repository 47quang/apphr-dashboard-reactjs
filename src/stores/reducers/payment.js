import { REDUX_STATE } from '../states';

const initialState = {
  payments: [],
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
    default:
      return state;
  }
};

export default paymentReducer;
