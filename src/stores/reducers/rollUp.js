import { REDUX_STATE } from '../states';

const initialState = {
  data: [],
  row: {
    code: 'NV001',
    fullname: 'Nguyễn Văn An',
    monday: '08:30 17:30',
    tuesday: '08:30 17:30',
    wednesday: '08:30 17:30',
    thursday: '08:30 17:30',
    friday: '08:30 17:30',
    saturday: '08:30 17:30',
    sunday: '08:30 17:30',
  },
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
