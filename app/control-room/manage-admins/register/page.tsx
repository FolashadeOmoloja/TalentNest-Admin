"use client";
import RegisterNewAdmin from "@/components/ManageAdmin/RegisterNewAdmin";
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
      <RegisterNewAdmin />
    </>
  );
};
export default page;
