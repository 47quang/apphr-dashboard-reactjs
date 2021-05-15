import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchLogs = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.log
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.log.SET_LOGS, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
