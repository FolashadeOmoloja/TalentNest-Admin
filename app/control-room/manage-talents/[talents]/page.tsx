"use client";

import DashboardNavbar from "@/components/Navbar/Navbar";
import TalentProfile from "@/components/Profile/TalentProfile";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { myJobsId: string } }) => {
  const { talent } = useSelector((store: any) => store.talent);
  return (
    <main className="bg-[#F4F5F7] pb-28">
      <DashboardNavbar activeItem={0} />
      <TalentProfile user={talent} />
    </main>
  );
};

export default page;
