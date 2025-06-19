import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company ",
  initialState: {
    company: null,
    allCompanies: [],
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
  },
});

export const { setCompany, setAllCompanies } = companySlice.actions;
export default companySlice.reducer;
