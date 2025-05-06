import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utilities/constants/constants";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setCompanyJobs } from "@/redux/slices/companyJobsSlice";

export const useGetAllJobs = () => {
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setJobs(response.data.jobs);
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

    fetchJobs();
  }, []);

  return { jobs, loading };
};

export const useGetCompanyJobs = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((store: any) => store.auth);

  const fetchJobs = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${JOB_API_END_POINT}/getSingleCompanyJobs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setCompanyJobs(response.data.jobs));
        router.push("/control-room/manage-companies/jobs");
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

  return { fetchJobs, loading };
};

export const useFetchCompanyPercentage = (companyId: string) => {
  const [jobPercentage, setJobPercentage] = useState<number>(0);
  const [hiresPercentage, setHiresPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const [jobsResponse, employedResponse] = await Promise.all([
          axios.get(`${JOB_API_END_POINT}/getSingleCompanyJobs/${companyId}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }),
          axios.get(
            `${APPLICATION_API_END_POINT}/get-company-hired-applicants/${companyId}`,
            {
              withCredentials: true,
            }
          ),
        ]);

        const jobs = jobsResponse.data.jobs || [];
        const employed = employedResponse.data.employed || [];

        const activeJobs = jobs.filter((job: { status: string }) =>
          job.status?.toLowerCase().includes("open")
        );

        const jobPercent =
          jobs.length > 0 ? (activeJobs.length / jobs.length) * 100 : 0;
        const hirePercent =
          jobs.length > 0 ? (employed.length / jobs.length) * 100 : 0;

        setJobPercentage(jobPercent);
        setHiresPercentage(hirePercent);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Error fetching company data";
        toast.error(errorMessage);
      }
    };

    if (companyId) fetchCompanyData();
  }, [companyId]);

  return { jobPercentage, hiresPercentage };
};

export const useDeleteCompanyJob = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  const onSubmit = async (id: string, jobId: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${JOB_API_END_POINT}/delete-job/${id}/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, jobs } = response.data;

      if (success) {
        toast.success(message);
        dispatch(setCompanyJobs(jobs));
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
