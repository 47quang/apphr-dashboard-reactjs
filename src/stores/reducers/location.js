const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PROVINCES':
      return { ...state, provinces: payload };
    default:
      return state;
  }
};

export default locationReducer;
