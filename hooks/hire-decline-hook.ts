import { setApplication, setOfferDraft } from "@/redux/slices/applicationSlice";
import { setLoading } from "@/redux/slices/authSlice";
import {
  setActive,
  setChangeTable,
} from "@/redux/slices/scheduledMeetingSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface applicantData {
  html: string;
  talentId: string;
  talentMail: string;
  jobRole: string;
  companyName: string;
  talentName: string;
  jobId: string;
}

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
  const dispatch = useDispatch();
  const hireCandidate = async (data: applicantData) => {
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

      const { success, message, updatedApplicants } = response.data;
      if (success) {
        dispatch(setApplication(updatedApplicants.applicants));
        dispatch(setActive({ 3: true }));
        dispatch(setChangeTable(3));
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
  return { hireCandidate, loading };
};

export const useDeclineCandidate = () => {
  const [declineLoading, setDeclineLoading] = useState(false);
  const dispatch = useDispatch();
  const declineCandidate = async (data: applicantData) => {
    try {
      setDeclineLoading(true);
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/decline-applicants`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { success, message, updatedApplicants } = response.data;
      if (success) {
        dispatch(setApplication(updatedApplicants.applicants));
        dispatch(setActive({ 4: true }));
        dispatch(setChangeTable(4));
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
      setDeclineLoading(false);
    }
  };

  return { declineCandidate, declineLoading };
};

export const useEndHireProcess = () => {
  const [endLoading, setEndLoading] = useState(false);
  const dispatch = useDispatch();
  const endHireProcess = async (jobId: string) => {
    try {
      setEndLoading(true);
      console.log(jobId);
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/end-hire-process`,
        { jobId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { success, message, updatedJob } = response.data;
      if (success) {
        dispatch(setApplication(updatedJob.applicants));
        dispatch(setActive({ 4: true }));
        dispatch(setChangeTable(4));
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
      setEndLoading(false);
    }
  };

  return { endHireProcess, endLoading };
};
