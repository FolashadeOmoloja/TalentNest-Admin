"use client";

import DashboardNavbar from "@/components/Navbar/Navbar";
import TalentProfile from "@/components/Profile/TalentProfile";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { myJobsId: string } }) => {
  const { talent } = useSelector((store: any) => store.talent);
  return (
    <main className=" pb-28">
      <DashboardNavbar />
      <TalentProfile user={talent} />
    </main>
  );
};

export default page;
