import { REDUX_STATE } from '../states';

const initialState = {
  data: [],
  row: {},
  histories: [],
  history: {
    type: 'Mạng nội bộ',
    time: '08:33 - 16/11/2020',
    rollUpType: 'Check-in',
  },
};

const rollUpReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.rollUp.GET_ROLLUP:
      return { ...state, data: payload };
    case REDUX_STATE.rollUp.GET_HISTORIES:
      return { ...state, histories: payload };
    default:
      return state;
  }
};

export default rollUpReducer;
