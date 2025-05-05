import { setLoading } from "@/redux/slices/authSlice";
import { setTalent } from "@/redux/slices/talentSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useGetAllTalents = () => {
  const dispatch = useDispatch();

  const [talents, setTalents] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchTalents = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/get-talents`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setTalents(response.data.talents);
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

    fetchTalents();
  }, []);

  return { talents, loading };
};

export const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchCompanies = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${ADMIN_API_END_POINT}/get-companies`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setCompanies(response.data.companies);
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

    fetchCompanies();
  }, []);

  return { companies, loading };
};

export const useUpdateTalentProfileStatus = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onSubmit = async (status: any, id: any) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/update-talent/${id}`,
        status,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, talent } = response.data;

      if (success) {
        toast.success(message);
        dispatch(setTalent(talent));
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

export const useDeleteTalentProfile = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (id: any) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-talent/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-talents");
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

export const useDeleteCompanyProfile = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (id: any) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-company/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-companies");
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
