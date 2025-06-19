import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
  name: "talent",
  initialState: {
    talent: null,
    allTalents: [],
  },
  reducers: {
    setTalent: (state, action) => {
      state.talent = action.payload;
    },
    setAllTalents: (state, action) => {
      state.allTalents = action.payload;
    },
  },
});

export const { setTalent, setAllTalents } = talentSlice.actions;
export default talentSlice.reducer;
