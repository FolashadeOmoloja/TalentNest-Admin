"use client";

import ClosedJobPosts from "@/components/ManageJobs/ClosedJobPosts";
import DashboardNavbar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { myJobsId: string } }) => {
  const { job } = useSelector((store: any) => store.job);
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <ClosedJobPosts
        jobData={job}
        href="/control-room/manage-companies/jobs"
        update={true}
      />
    </>
  );
};

export default page;
