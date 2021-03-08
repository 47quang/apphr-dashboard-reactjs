export const CHANGE_HEADER_STATE = "CHANGE_LIST_BUTTON";

export const changeListButtonHeader = (lst) => {
  return {
    type: CHANGE_HEADER_STATE,
    payload: {
      lst,
    },
  };
};
