import { api } from "../apis/index";
import { REDUX_STATE } from "../states";

// export const fetchAccounts = (params) => {
//   return (dispatch, getState) => {
//     accountApi
//       .getAccounts(params)
//       .then((accounts) => {
//         dispatch(setAccounts(accounts.payload.data));
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const fetchProvinces = (params) => {
  return (dispatch, getState) => {
    api.location
      .getProvinces()
      .then(({ payload }) => {
        dispatch({ type: "SET_PROVINCES", payload });
      })
      .catch((err) => {});
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
        console.log(err);
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
        console.log(err);
      });
  };
};
