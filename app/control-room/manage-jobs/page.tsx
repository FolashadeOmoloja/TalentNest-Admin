import JobTable from "@/components/ManageJobs/JobTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const ManageTalents = () => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <JobTable />
    </>
  );
};

export default ManageTalents;
