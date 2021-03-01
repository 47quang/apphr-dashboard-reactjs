import accountApi from '../apis/account';

export const SET_ACCOUNT = 'SET_ACCOUNT';

export function setAccounts(accounts) {
  console.log({ accounts });
  return {
    type: SET_ACCOUNT,
    payload: {
      accounts
    }
  };
}

export function fetchAccounts(params) {
  return (dispatch, getState) => {
    accountApi
      .getAccounts(params)
      .then(accounts => {
        dispatch(setAccounts(accounts.payload.data));
      })
      .catch(err => console.log(err));
  };
}
