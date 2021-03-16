import { REDUX_STATE } from '../states';

const initialState = {
  holidays: [],
  holiday: {
    title: '',
    startDate: '',
    endDate: '',
    coefficient: 0,
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
      };
    default:
      return state;
  }
};

export default holidayReducer;
