import { setApplication } from "@/redux/slices/applicationSlice";
import { setLoading } from "@/redux/slices/authSlice";
import {
  setActive,
  setChangeTable,
  setScheduledMeeting,
} from "@/redux/slices/scheduledMeetingSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import { MeetingType } from "@/utilities/typeDefs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const handleCreateSchedule = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onSubmit = async (data: MeetingType) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/schedule-meeting`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, updatedApplicants, updatedScheduledMeeting } =
        response.data;
      if (success) {
        dispatch(setApplication(updatedApplicants.applicants));
        dispatch(setScheduledMeeting(updatedScheduledMeeting));
        dispatch(setActive({ 2: true }));
        dispatch(setChangeTable(2));
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};
