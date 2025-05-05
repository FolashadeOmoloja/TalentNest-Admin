"use client";

import DashboardNavbar from "@/components/Navbar/Navbar";
import CompanyProfile from "@/components/Profile/HireTalentProfile";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { myJobsId: string } }) => {
  const { company } = useSelector((store: any) => store.company);
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <CompanyProfile user={company} />
    </>
  );
};

export default page;
