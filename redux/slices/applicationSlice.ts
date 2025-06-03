import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: [],
    jobId: "",
  },
  reducers: {
    setApplication: (state, action) => {
      state.application = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
  },
});

export const { setApplication,setJobId } = applicationSlice.actions;
export default applicationSlice.reducer;
