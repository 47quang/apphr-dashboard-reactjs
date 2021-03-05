const initialState = {
  language: "en",
  sidebarShow: "responsive",
};

const styleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_LANGUAGE":
      return { ...state, ...payload };
    case "CHANGE_SIDEBARSHOW":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default styleReducer;
