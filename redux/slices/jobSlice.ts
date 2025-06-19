import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: null,
    allJobs: [],
  },
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setJob, setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
