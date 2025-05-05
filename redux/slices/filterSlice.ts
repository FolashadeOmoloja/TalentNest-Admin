import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filter: {
      _id: "",
      skills: [""],
      country: [""],
      role: [""],
    },
    filterLoading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFilterLoading: (state, action) => {
      state.filterLoading = action.payload;
    },
  },
});

export const { setFilter, setFilterLoading } = filterSlice.actions;
export default filterSlice.reducer;
