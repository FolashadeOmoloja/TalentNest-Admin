import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
    companyNotifications: [],
    talentNotifications: [],
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setCompanyNotification: (state, action) => {
      state.companyNotifications = action.payload;
    },
    setTalentNotification: (state, action) => {
      state.talentNotifications = action.payload;
    },
  },
});

export const {
  setNotification,
  setTalentNotification,
  setCompanyNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
