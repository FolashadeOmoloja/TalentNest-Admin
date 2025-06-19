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
import { useEffect, useState } from "react";
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

export const useCreateCompanySchedule = () => {
  const dispatch = useDispatch();
  const onCreate = async (data: MeetingType) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/schedule-meeting`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { success, message, updatedScheduledMeeting } = response.data;
      if (success) {
        dispatch(setScheduledMeeting(updatedScheduledMeeting));
        console.log(updatedScheduledMeeting, "1");
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };
  return { onCreate };
};

export const useGetSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `${ADMIN_API_END_POINT}/get-schedule-meeting`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const { success, message, scheduledMeetings } = response.data;
        if (success) {
          dispatch(setScheduledMeeting(scheduledMeetings));
          setSchedules(scheduledMeetings);
        } else {
          toast.error(message);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch admins";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSchedules();
  }, []);
  return { schedules };
};

export const handleUpdateSchedule = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onUpdate = async (data: MeetingType, id: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/update-meeting/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, updatedScheduledMeeting } = response.data;
      if (success) {
        dispatch(setScheduledMeeting(updatedScheduledMeeting));
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
    onUpdate,
    loading,
  };
};
export const handleDeleteSchedule = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onDelete = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-meeting/${id}`,
        { withCredentials: true }
      );

      const { success, message, updatedScheduledMeeting } = response.data;
      if (success) {
        dispatch(setScheduledMeeting(updatedScheduledMeeting));
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
    onDelete,
    loading,
  };
};
