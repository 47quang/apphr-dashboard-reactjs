import { api } from "../apis/index";
import { REDUX_STATE } from "../states";

export const fetchGeneralInfo = (id) => {
  return (dispatch, getState) => {
    api.general
      .getGeneralInfo(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.general.SET_GENERAL, payload });
      })
      .catch((err) => {});
  };
};
