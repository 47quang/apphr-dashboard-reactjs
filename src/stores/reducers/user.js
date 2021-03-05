const initialState = {
  token: localStorage.getItem("token") || "",
  user: localStorage.getItem("user") || "",
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default userReducer;
