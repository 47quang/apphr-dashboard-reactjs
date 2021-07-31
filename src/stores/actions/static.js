import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
        handleExceptions(err, dispatch, getState, 'fetchStatics');
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
        handleExceptions(err, dispatch, getState, 'deleteStatic');
      });
  };
};

export const setEmptyStatics = () => {
  return {
    type: REDUX_STATE.static.EMPTY_LIST,
    payload: [],
  };
};
