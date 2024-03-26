import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  rating:null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setRatingData(state, action) {
      state.rating = action.payload;
    },
  },
});

export const { setUserInfo,setRatingData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
