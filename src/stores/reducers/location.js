import { REDUX_STATE } from "../states";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const locationReducer = (state = initialState, { type, payload }) => {
  console.log("type", type);
  switch (type) {
    case REDUX_STATE.location.SET_PROVINCES:
      return { ...state, provinces: payload };
    case REDUX_STATE.location.SET_DISTRICTS:
      return { ...state, districts: payload };
    case REDUX_STATE.location.SET_WARDS:
      return { ...state, wards: payload };
    default:
      return state;
  }
};

export default locationReducer;
