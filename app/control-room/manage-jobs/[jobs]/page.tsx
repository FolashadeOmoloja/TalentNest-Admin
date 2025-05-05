"use client";

import JobPost from "@/components/ManageJobs/JobPost";
import DashboardNavbar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { myJobsId: string } }) => {
  const { job } = useSelector((store: any) => store.job);
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <JobPost jobData={job} />
    </>
  );
};

export default page;
