import ReviewTable from "@/components/ManageReview/ReviewTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={2} />
      <ReviewTable />
    </>
  );
};
export default page;
