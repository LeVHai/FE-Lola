import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoCurrentUser: null,
  infoUser:{},
  isLoading: false,
  isLoadingUpdate: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setState(state, action) {
      return { ...state, ...action.payload };
    },
    getCurrentUser(state) {
      state.isLoading = true;
    },
    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.infoCurrentUser = action.payload;
    },
    getCurrentUserFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCurrentUser(state, action) {
      state.isLoadingUpdate = true;
    },
    updateCurrentUserSuccess(state, action) {
      state.infoCurrentUser = action.payload;
      state.isLoadingUpdate = false;
      state.error = null;
    },
    updateCurrentUserFailed(state, action) {
      state.isLoadingUpdate = false;
      state.error = action.payload;
    },
  },
});
export const {
  setState,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFailed,
  updateCurrentUser,
  updateCurrentUserSuccess,
  updateCurrentUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
