import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setFilter, setFilterLoading } from "@/redux/slices/filterSlice";

export const useGetAllFilters = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const { filter } = useSelector((store: any) => store.filters);
  useEffect(() => {
    const fetchFilters = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/get-filters`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(setFilter(response.data.data));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch filters";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFilters();
  }, [dispatch]);

  return { filter, loading };
};

export const AddSkill = () => {
  const dispatch = useDispatch();
  const { filterLoading } = useSelector((store: any) => store.filters);

  const onSubmit = async (data: any) => {
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/add-skill`,
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
        dispatch(setFilter(response.data.data));
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
    filterLoading,
  };
};

export const DeleteSkill = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    // Accept `data` containing id and skill
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/delete-skill`,
        data, // Pass data in request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        dispatch(setFilter(response.data.data));
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
  };
};

export const AddCountry = () => {
  const dispatch = useDispatch();
  const { filterLoading } = useSelector((store: any) => store.filters);

  const onSubmit = async (data: any) => {
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/add-country`,
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
        dispatch(setFilter(response.data.data));
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
    filterLoading,
  };
};

export const DeleteCountry = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    // Accept `data` containing id and country
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/delete-country`,
        data, // Pass data in request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        dispatch(setFilter(response.data.data));
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
  };
};

export const AddRole = () => {
  const dispatch = useDispatch();
  const { filterLoading } = useSelector((store: any) => store.filters);

  const onSubmit = async (data: any) => {
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/add-role`,
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
        dispatch(setFilter(response.data.data));
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
    filterLoading,
  };
};

export const DeleteRole = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    // Accept `data` containing id and role
    dispatch(setFilterLoading(true));

    try {
      const response = await axios.put(
        `${ADMIN_API_END_POINT}/delete-role`,
        data, // Pass data in request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        dispatch(setFilter(response.data.data));
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
  };
};
