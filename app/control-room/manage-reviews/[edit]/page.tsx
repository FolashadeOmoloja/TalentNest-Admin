import EditReviewBox from "@/components/ManageReview/EditReview";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { Id: string } }) => {
  return (
    <main className="pb-28">
      <DashboardNavbar />
      <EditReviewBox />
    </main>
  );
};

export default page;
