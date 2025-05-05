import CompanyJobTable from "@/components/ManageJobs/CompanyJobTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <CompanyJobTable />
    </>
  );
};

export default page;
