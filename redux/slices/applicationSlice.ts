import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: [],
    jobId: "",
    offerDraft: "",
  },
  reducers: {
    setApplication: (state, action) => {
      state.application = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    setOfferDraft: (state, action) => {
      state.offerDraft = action.payload;
    },
  },
});

export const { setApplication, setJobId, setOfferDraft } =
  applicationSlice.actions;
export default applicationSlice.reducer;
