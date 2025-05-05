"use client";
import ResetPasswordBox from "@/components/ManageAdmin/ResetPassword";
import DashboardNavbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const page = () => {
  const { user } = useSelector((store: any) => store.auth);
  const router = useRouter();

  useEffect(() => {
    if (user?.accountRole !== "SuperAdmin") {
      toast.error("You are unauthorized");
      router.push("/control-room");
    }
  }, [user, router]);
  return (
    <>
      <DashboardNavbar />
      <ResetPasswordBox />
    </>
  );
};
export default page;
