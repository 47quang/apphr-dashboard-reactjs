import { REDUX_STATE } from '../states';

const initialState = {
  holidays: {
    payload: [],
    total: 0,
  },
  holiday: {
    id: 0,
    shortname: '',
    title: '',
    startDate: '',
    endDate: '',
    coefficient: 0,
  },
  requests: [],
  request: {
    type: '',
    amount: 0,
  },
  policy: {
    content: '',
  },
};

const holidayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.holiday.SET_HOLIDAYS:
      return { ...state, holidays: payload };
    case REDUX_STATE.holiday.SET_HOLIDAY:
      return { ...state, holiday: payload };
    case REDUX_STATE.holiday.DELETE_HOLIDAY:
      return {
        ...state,
        holidays: state.holidays.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.holiday.EMPTY_VALUE:
      return {
        ...state,
        holiday: initialState.holiday,
        holidays: [],
      };
    case REDUX_STATE.holiday.EMPTY_LIST:
      return {
        ...state,
        holidays: {},
      };
    case REDUX_STATE.holiday.GET_REQUESTS:
      return {
        ...state,
        requests: payload,
      };
    case REDUX_STATE.holiday.GET_REQUEST:
      return {
        ...state,
        request: payload,
      };
    case REDUX_STATE.holiday.SET_POLICY:
      return {
        ...state,
        policy: { content: payload },
      };
    default:
      return state;
  }
};

export default holidayReducer;
