import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: null,
  },
  reducers: {
    setReview: (state, action) => {
      state.review = action.payload;
    },
  },
});

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
