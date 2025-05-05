"use client";

import { useEffect } from "react";
import DashboardNavbar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminTable from "@/components/ManageAdmin/AdminTable";

const Page = () => {
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
      <AdminTable />
    </>
  );
};

export default Page;
