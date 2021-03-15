import { REDUX_STATE } from '../states';

const initialState = {
  name: '',
  provinceId: 0,
  districtId: 0,
  wardId: 0,
  address: '',
  phone: '',
  email: '',
  shortname: '',
  taxCode: '',
  note: '',
};

const generalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.general.SET_GENERAL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default generalReducer;
