import { api } from '../apis';
import { REDUX_STATE } from '../states';

export const fetchShifts = (params) => {
  return (dispatch, getState) => {
    api.shift.getShiftList(params).then(({ payload }) => {
      dispatch({ type: REDUX_STATE.shift.GET_SHIFTS, payload: payload });
    });
  };
};
export const fetchShift = (id) => {
  const deCodeChecked = (_checked) =>
    _checked.reduce((acc, val, idx) => {
      if (parseInt(val) !== 0) acc.push(idx + 1 + '');
      return acc;
    }, []);
  const convertTime = (time) => {
    let timeTemp = time.split(':');
    return timeTemp.splice(0, 2).join(':');
  };

  return (dispatch, getState) => {
    api.shift.getShift(id).then(({ payload }) => {
      payload.operateLoop = deCodeChecked(payload.operateLoop);
      payload.startCC = convertTime(payload.startCC);
      payload.endCC = convertTime(payload.endCC);
      dispatch({ type: REDUX_STATE.shift.GET_SHIFT, payload: payload });
    });
  };
};
export const createNewShift = (data) => {
  return (dispatch, getState) => {
    api.shift
      .postShift(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.SET_SHIFT, payload });
      })
      .catch((err) => {
        console.log(REDUX_STATE.shift.GET_SHIFT, err);
      });
  };
};

export const updateShift = (data) => {
  return (dispatch, getState) => {
    api.shift
      .putShift(data)
      .then(({ payload }) => {
        dispatch({
          type: REDUX_STATE.shift.SET_SHIFT,
          payload: payload,
        });
      })
      .catch((err) => {
        console.log(REDUX_STATE.shift.GET_SHIFT, err);
      });
  };
};

export const deleteShift = (params) => {
  return (dispatch, getState) => {
    api.shift
      .deleteShift(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.DELETE_SHIFT, payload });
      })
      .catch((err) => {
        console.log(REDUX_STATE.shift.GET_SHIFT, err);
      });
  };
};
