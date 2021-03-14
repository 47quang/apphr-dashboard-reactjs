import { api } from "../apis/index";
import { REDUX_STATE } from "../states";

export const fetchPositions = (params) => {
  return (dispatch, getState) => {
    api.position
      .getPositions()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITIONS, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchPosition = (id) => {
  return (dispatch, getState) => {
    api.position
      .getPosition(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createPosition = (params) => {
  console.log(params);
  return (dispatch, getState) => {
    api.position
      .postPosition(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePosition = (data, id) => {
  return (dispatch, getState) => {
    api.position
      .putPosition(data, id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch, getState) => {
    api.position
      .deletePosition(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.DELETE_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDeletedPositionId = (id) => {
  return {
    type: REDUX_STATE.position.SET_DELETED_BRANCH_ID,
    payload: id,
  };
};

export const setEmptyPosition = () => {
  return {
    type: REDUX_STATE.position.EMPTY_VALUE,
    payload: [],
  };
};
