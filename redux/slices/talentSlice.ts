import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
  name: "talent",
  initialState: {
    talent: null,
  },
  reducers: {
    setTalent: (state, action) => {
      state.talent = action.payload;
    },
  },
});

export const { setTalent } = talentSlice.actions;
export default talentSlice.reducer;
