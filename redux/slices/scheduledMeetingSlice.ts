import { createSlice } from "@reduxjs/toolkit";

const scheduledMeetingSlice = createSlice({
  name: "scheduledMeeting",
  initialState: {
    scheduledMeeting: [],
    changeTable: 0,
    active: { 0: true },
  },
  reducers: {
    setScheduledMeeting: (state, action) => {
      state.scheduledMeeting = action.payload;
    },
    setChangeTable: (state, action) => {
      state.changeTable = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setScheduledMeeting, setChangeTable, setActive } =
  scheduledMeetingSlice.actions;
export default scheduledMeetingSlice.reducer;
