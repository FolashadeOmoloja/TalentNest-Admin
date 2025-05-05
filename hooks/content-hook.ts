import { BLOG_API_END_POINT } from "@/utilities/constants/constants";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useGetAllBlogPosts = () => {
  const dispatch = useDispatch();

  const [blogPosts, setBlogPost] = useState([]);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchblogPosts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${BLOG_API_END_POINT}/get-blogs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setBlogPost(response.data.blogPosts);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch blogPost";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchblogPosts();
  }, []);

  return { blogPosts, loading };
};

export const CreateBlogPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (formData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${BLOG_API_END_POINT}/create-blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-blogs");
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

export const EditBlogPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (formData: any, id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${BLOG_API_END_POINT}/edit-blog/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-blogs");
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

export const DeleteBlogPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (id: string) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(
        `${BLOG_API_END_POINT}/delete-blog/${id}`,
        {
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push("/control-room/manage-blogs");
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
