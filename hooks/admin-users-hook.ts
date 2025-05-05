import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setFilterLoading } from "@/redux/slices/filterSlice";

export const useGetAllAdmins = () => {
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);

  useEffect(() => {
    const fetchAdmins = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/get-admin`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setAdmins(response.data.admins);
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

    fetchAdmins();
  }, []);

  return { admins, loading };
};

export const RegisterAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (formData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-admins");
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

export const UpdateAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/update-admin/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-admins");
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

export const DeleteAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filterLoading } = useSelector((store: any) => store.filters);
  const onSubmit = async (id: string) => {
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-admin/${id}`,
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-admins");
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
      dispatch(setFilterLoading(false));
    }
  };

  return {
    onSubmit,
    loading: filterLoading,
  };
};

export const ResetAdminPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/reset-admin-password/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-admins");
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
