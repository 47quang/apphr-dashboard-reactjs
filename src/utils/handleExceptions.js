import { REDUX_STATE } from 'src/stores/states';

const { RESPONSE_CODE } = require('src/constants/key');

export const handleExceptions = (err, dispatch, getState, functionName) => {
  console.debug(functionName + ' errors', err.response);
  let language = getState().style.language;
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      // case RESPONSE_CODE.SE_BAD_GATEWAY:
      //   errorMessage = 'Server bad gateway';
      //   errorMessage = err.response.data.message[language] || err.response.data.message.en || errorMessage;
      //   break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
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
      default:
        errorMessage = err.response.data.message[language] || err.response.data.message.en || errorMessage;
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
