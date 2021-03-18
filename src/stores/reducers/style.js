import { REDUX_STATE } from '../states/index';

const initialState = {
  language: 'vi',
  sidebarShow: 'responsive',
};

const styleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.style.CHANGE_LANGUAGE:
      return { ...state, ...payload };
    case REDUX_STATE.style.CHANGE_SIDE_BAR_SHOW:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default styleReducer;
