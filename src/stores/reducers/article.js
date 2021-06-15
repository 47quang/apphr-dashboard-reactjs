import { REDUX_STATE } from '../states';

const initialState = {
  articles: {
    payload: [],
    total: 0,
  },
  article: {
    code: '',
    title: '',
    typeId: '',
    description: '',
    content: '',
    branchIds: [],
    departmentIds: [],
    positionIds: [],
    uploads: [],
  },
};

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.article.SET_ARTICLES:
      return { ...state, articles: payload };
    case REDUX_STATE.article.SET_ARTICLE:
      return { ...state, article: Object.assign({}, state.article, payload) };
    case REDUX_STATE.article.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.article.EMPTY_VALUE:
      return {
        ...state,
        article: initialState.article,
      };
    case REDUX_STATE.article.EMPTY_LIST:
      return {
        ...state,
        articles: initialState.articles,
      };
    default:
      return state;
  }
};

export default articleReducer;
