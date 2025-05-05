import { createSlice } from "@reduxjs/toolkit";

const successApplicantsSlice = createSlice({
  name: "successApplicants",
  initialState: {
    successApplicants: [],
  },
  reducers: {
    setSuccessApplicants: (state, action) => {
      state.successApplicants = action.payload;
    },
  },
});

export const { setSuccessApplicants } = successApplicantsSlice.actions;
export default successApplicantsSlice.reducer;
