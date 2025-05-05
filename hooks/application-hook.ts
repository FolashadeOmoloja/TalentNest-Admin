import { setApplication } from "@/redux/slices/applicationSlice";
import { setLoading } from "@/redux/slices/authSlice";
import { setSuccessApplicants } from "@/redux/slices/successAplicantsSlice";
import { APPLICATION_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useGetApplicants = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((store: any) => store.auth);

  const fetchApplicants = async (jobId: string) => {
    const encodedId = btoa(jobId);
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/${jobId}/talents`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setApplication(response.data.job.applicants));
        router.push(`/control-room/manage-jobs/applications/${encodedId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch jobs";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchApplicants, loading };
};

export const useGetAllEmployed = () => {
  const dispatch = useDispatch();

  const [successApplications, setSuccessApplications] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchApplicants = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/get-hired-applicants`,
          {
            withCredentials: true,
          }
        );
        setSuccessApplications(response.data.employed);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch talents";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchApplicants();
  }, []);

  return { successApplications, loading };
};

export const useGetAllCompanyEmployed = () => {
  const dispatch = useDispatch();
  const fetchApplicants = async (id: any) => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/get-company-hired-applicants/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSuccessApplicants(response.data.employed));
      console.log(response.data.employed);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch talents";
    }
  };

  return { fetchApplicants };
};

export const updateApplicationStatus = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((store: any) => store.auth);
  const handleUpdate = async (
    status: string,
    applicantId: string,
    jobId: string
  ) => {
    dispatch(setLoading(true));
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.put(
        `${APPLICATION_API_END_POINT}/${applicantId}/${jobId}/status`,
        { status }
      );
      if (response.data.success) {
        dispatch(setApplication(response.data.job.applicants));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch jobs";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleUpdate, loading };
};
