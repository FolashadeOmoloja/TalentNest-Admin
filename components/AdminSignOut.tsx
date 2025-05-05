"use client";
import FormLogo from "@/components/Elements/FormLogo";
import { useRouter } from "next/navigation";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ADMIN_API_END_POINT } from "@/utilities/constants/constants";
import Logo from "./Logo";

const AdminSignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const handleSignOut = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${ADMIN_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        router.push("/");
        toast.success(res.data.message);
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

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className="h-svh flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        <section className=" max-w-[500px] max-sm:px-3 ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="centered flex-col  mb-20 mt-10">
            <h3 className="text-[#1B1818] font-semibold text-2xl mb-1 text-center">
              Log out from TalentNest Control Room ?
            </h3>
            <p className="text-gray-500  text-center">
              You are about to log out from this account.
            </p>
          </div>

          <div className="mt-4 flex gap-10 max-xsm:gap-5">
            <button className="login-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="form-btn" onClick={handleSignOut}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
              ) : (
                "Sign Out"
              )}
            </button>
          </div>
        </section>
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            Empowering Global Connections Through Talent
          </p>
          <p className="text-sm ">
            At TalentNest, we connect skilled professionals to companies
            worldwide, helping both thrive in a growing digital economy.
          </p>
        </div>
        <div className=" w-full h-full absolute inset-0 ">
          <img
            src="/images/homepage/signup-bg.svg"
            className=" w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default AdminSignOut;
