import { setLoading } from "@/redux/slices/authSlice";
import {
  setCompanyNotification,
  setNotification,
  setTalentNotification,
} from "@/redux/slices/notificationSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const handleSendCompanyNotification = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (
    id: any,
    senderMessage: string,
    receiverMessage: string,
    meetingUrlLink?: string
  ) => {
    const meetingUrl = meetingUrlLink || null;
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/set-company-notification/${id}`,
        {
          senderMessage,
          receiverMessage,
          meetingUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        router.push("/control-room/notifications");
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

export const handleSendTalentNotification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (
    id: any,
    senderMessage: string,
    receiverMessage: string,
    meetingUrlLink?: string
  ) => {
    const meetingUrl = meetingUrlLink || null;
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/set-talent-notification/${id}`,
        {
          senderMessage,
          receiverMessage,
          meetingUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        router.push("/control-room/notifications");
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
  };
};

export const useGetAdminNotifications = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchNotice = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${ADMIN_API_END_POINT}/get-admin-notification`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setNotification(response.data.notifications));
        dispatch(setCompanyNotification(response.data.companyNotifications));
        dispatch(setTalentNotification(response.data.talentNotifications));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch companies";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotice();
  }, []);

  return { loading };
};

export const useDeleteNotificationById = () => {
  const dispatch = useDispatch();
  const onSubmit = async (id: any) => {
    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-notice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setNotification(response.data.notifications));
        dispatch(setCompanyNotification(response.data.companyNotifications));
        dispatch(setTalentNotification(response.data.talentNotifications));
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
    }
  };

  return {
    onSubmit,
  };
};

export const useDeleteAllNotifications = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-all-notice`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setNotification(response.data.notifications));
        dispatch(setCompanyNotification(response.data.companyNotifications));
        dispatch(setTalentNotification(response.data.talentNotifications));
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
  };
};
