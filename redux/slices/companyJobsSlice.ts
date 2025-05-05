import { createSlice } from "@reduxjs/toolkit";

const companyJobsSlice = createSlice({
  name: "companyJobs",
  initialState: {
    companyJobs: [],
  },
  reducers: {
    setCompanyJobs: (state, action) => {
      state.companyJobs = action.payload;
    },
  },
});

export const { setCompanyJobs } = companyJobsSlice.actions;
export default companyJobsSlice.reducer;
