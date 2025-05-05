import CreateReviewBox from "@/components/ManageReview/CreateReview";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={2} />
      <CreateReviewBox />
    </>
  );
};
export default page;
