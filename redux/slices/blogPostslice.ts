import { createSlice } from "@reduxjs/toolkit";

const blogPostSlice = createSlice({
  name: "blogPost",
  initialState: {
    blogPost: null,
  },
  reducers: {
    setblogPost: (state, action) => {
      state.blogPost = action.payload;
    },
  },
});

export const { setblogPost } = blogPostSlice.actions;
export default blogPostSlice.reducer;
