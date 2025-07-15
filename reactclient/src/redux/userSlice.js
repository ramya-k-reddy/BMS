import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    ClearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { SetUser, ClearUser } = userSlice.actions;
export default userSlice.reducer;
