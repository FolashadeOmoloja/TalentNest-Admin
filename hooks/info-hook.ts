import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useGetAllReviews = () => {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/get-reviews`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setReviews(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch reviews";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading };
};

export const CreateReview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (formData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/create-review`,
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
        router.push("/control-room/manage-reviews");
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

export const EditReview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/edit-review/${id}`,
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
        router.push("/control-room/manage-reviews");
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

export const DeleteReview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-review/${id}`,
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-reviews");
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

export const useGetAllFaqs = () => {
  const dispatch = useDispatch();

  const [faqs, setFaqs] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchFaqs = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/get-faqs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setFaqs(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch faqs";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFaqs();
  }, []);

  return { faqs, loading };
};

export const CreateFaq = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/create-faq`,
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
        router.push("/control-room/manage-faqs");
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

export const EditFaq = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/edit-faq/${id}`,
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
        router.push("/control-room/manage-faqs");
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

export const DeleteFaq = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(
        `${ADMIN_API_END_POINT}/delete-faq/${id}`,
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-faqs");
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
