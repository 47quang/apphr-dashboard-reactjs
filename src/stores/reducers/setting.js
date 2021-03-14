import { REDUX_STATE } from '../states';

const initialState = {
  email: '',
  name: '',
  shortname: '',
  phone: '',
  taxCode: '',
  provinceId: 0,
  districtId: 0,
  wardId: 0,
  address: '',
  note: '',
};

const settingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.setting.SET_GENERAL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default settingReducer;
