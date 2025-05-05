import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faq: null,
  },
  reducers: {
    setFaq: (state, action) => {
      state.faq = action.payload;
    },
  },
});

export const { setFaq } = faqSlice.actions;
export default faqSlice.reducer;
