import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser, setLoading } from "../redux/slices/authSlice";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import Cookies from "js-cookie";

export const useLoginAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (AdminData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${ADMIN_API_END_POINT}/login`,
        AdminData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, admin } = response.data;
      if (success) {
        // Store the 'Set-Cookie' header manually if necessary
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          Cookies.set("token", setCookieHeader[0]);
        }

        // Set the user data in Redux
        dispatch(setUser(admin));

        // Redirect to the dashboard with `refresh=true` in query params
        router.push("/control-room?refresh=true");

        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};
