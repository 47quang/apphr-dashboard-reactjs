import { RESPONSE_CODE } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleStaticExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
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
      case RESPONSE_CODE.CE_NOT_FOUND:
        errorMessage = err.response.data.message.en;
        break;
      default:
        errorMessage = err.response?.data?.message?.en || errorMessage;
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};

export const fetchStatics = (setLoading, setFetch) => {
  const type = {
    xlsx: 'Excel',
    docx: 'Word',
    csv: 'Excel',
  };
  return (dispatch, getState) => {
    api.static
      .getAll()
      .then(({ payload, total }) => {
        let rvPayload = [];
        for (const value of Object.values(payload)) {
          for (var e of value) {
            let stampIndex = e.filename.search(/-[0-9]{13}\./);
            e.type = type[e.filename.substring(stampIndex + 15)];
            e.createdAt = formatDateTimeToString(new Date(parseInt(e.filename.substring(stampIndex + 1, stampIndex + 14))));
            e.name = e.filename.substring(0, stampIndex);
            e.id = e.filename.substring(stampIndex + 1, stampIndex + 14);
            rvPayload.push(e);
          }
        }
        if (setFetch) setFetch(rvPayload);

        dispatch({ type: REDUX_STATE.static.SET_STATICS, payload: rvPayload });
      })
      .catch((err) => {
        handleStaticExceptions(err, dispatch, 'fetchStatics');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const deleteStatic = (filename, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.static
      .delete(filename)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleStaticExceptions(err, dispatch, 'deleteStatic');
      });
  };
};

export const setEmptyStatics = () => {
  return {
    type: REDUX_STATE.static.EMPTY_LIST,
    payload: [],
  };
};
