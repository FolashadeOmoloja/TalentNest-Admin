import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: [],
  },
  reducers: {
    setApplication: (state, action) => {
      state.application = action.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
