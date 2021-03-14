export const CHANGE_HEADER_STATE = 'CHANGE_LIST_BUTTON';
export const CHANGE_ACTIONS = 'CHANGE_ACTIONS';

export const changeListButtonHeader = (lst) => {
  return {
    type: CHANGE_HEADER_STATE,
    payload: {
      lst,
    },
  };
};

export const changeActions = (payload) => {
  return {
    type: CHANGE_ACTIONS,
    payload,
  };
};
