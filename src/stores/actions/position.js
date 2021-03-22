import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchPositions = (params) => {
  return (dispatch, getState) => {
    api.position
      .getAll()
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
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createPosition = (params, history) => {
  return (dispatch, getState) => {
    api.position
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
        history.push(ROUTE_PATH.POSITION + `/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePosition = (data, id) => {
  return (dispatch, getState) => {
    api.position
      .put(data, id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deletePosition = (params) => {
  return (dispatch, getState) => {
    api.position
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.DELETE_POSITION, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyPosition = () => {
  return {
    type: REDUX_STATE.position.EMPTY_VALUE,
    payload: [],
  };
};
