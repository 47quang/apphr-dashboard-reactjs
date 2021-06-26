import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleLocationExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
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
