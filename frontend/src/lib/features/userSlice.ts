import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string;
  name?: string;
  email?: string;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = state || {};
      return action.payload;
    },
    clearUser: () => {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
