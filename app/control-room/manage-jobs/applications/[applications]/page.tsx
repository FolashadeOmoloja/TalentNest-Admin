import ApplicationsTable from "@/components/ManageApplications/ApplicationsTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { myJobsId: string } }) => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <ApplicationsTable />
    </>
  );
};

export default page;
