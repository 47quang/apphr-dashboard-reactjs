import { api } from '../apis/index';
// export const setAccounts = (accounts) => {
//   return {
//     type: SET_ACCOUNT,
//     payload: {
//       accounts,
//     },
//   };
// };

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
    api.location.getProvinceList().then((resp) => {
      console.log({ resp });
    });
  };
};
