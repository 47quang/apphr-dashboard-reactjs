import { REDUX_STATE } from '../states';

const initialState = {
  types: [],
  type: {
    code: '',
    name: '',
  },
};

const articleTypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.articleType.SET_TYPES:
      return { ...state, types: payload };
    case REDUX_STATE.articleType.SET_TYPE:
      return { ...state, type: Object.assign({}, state.type, payload) };
    case REDUX_STATE.articleType.DELETE_ARTICLE:
      return {
        ...state,
        types: state.types.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.articleType.EMPTY_VALUE:
      return {
        ...state,
        type: initialState.type,
      };
    default:
      return state;
  }
};

export default articleTypeReducer;
