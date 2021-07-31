import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchLogs = (params, onTotalChange, setLoading) => {
  return (dispatch, getState) => {
    api.log
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((log) => {
                log.createdAt = formatDateTimeToString(log.createdAt);
                log.user = log?.profile?.fullname ?? '';
                return log;
              })
            : [];
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.log.SET_LOGS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchLogs');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const setEmptyLogs = () => {
  return {
    type: REDUX_STATE.log.EMPTY_LIST,
    payload: [],
  };
};
