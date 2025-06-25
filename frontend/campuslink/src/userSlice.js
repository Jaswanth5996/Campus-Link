import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: "",
  username: "",
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, username, token } = action.payload;
      state.email = email;
      state.username = username;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout(state) {
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
