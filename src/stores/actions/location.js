import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleLocationExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchProvinces = (params) => {
  return (dispatch, getState) => {
    api.location
      .getProvinces()
      .then(({ payload }) => {
        dispatch({ type: 'SET_PROVINCES', payload });
      })
      .catch((err) => {
        handleLocationExceptions(err, dispatch, 'fetchProvinces');
      });
  };
};

export const fetchDistricts = (params) => {
  return (dispatch, getState) => {
    api.location
      .getDistricts(params.provinceId)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.location.SET_DISTRICTS, payload });
      })
      .catch((err) => {
        handleLocationExceptions(err, dispatch, 'fetchDistricts');
      });
  };
};

export const fetchWards = (params) => {
  return (dispatch, getState) => {
    api.location
      .getWards(params.districtId)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.location.SET_WARDS, payload });
      })
      .catch((err) => {
        handleLocationExceptions(err, dispatch, 'fetchWards');
      });
  };
};
