import { setOfferDraft } from "@/redux/slices/applicationSlice";
import { setLoading } from "@/redux/slices/authSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useCreateOfferLetterDraft = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const createOffer = async (data: {
    talentName: string;
    jobRole: string;
    companyName: string;
    startDate: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/generate-offer-letter-draft`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { success, draft, message } = response.data;
      if (success) {
        dispatch(setOfferDraft(draft));
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
      setLoading(false);
    }
  };
  return {
    createOffer,
    loading,
  };
};

export const useHireCandidate = () => {
  const [loading, setLoading] = useState(false);
  const hireCandidate = async (data: {
    html: string;
    talentId: string;
    talentMail: string;
    jobRole: string;
    companyName: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/send-offer-letter-hire`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        "An unknown error occured";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return {
    hireCandidate,
    loading,
  };
};
