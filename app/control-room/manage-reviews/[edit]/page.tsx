import EditReviewBox from "@/components/ManageReview/EditReview";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { Id: string } }) => {
  return (
    <main className="bg-[#F4F5F7] pb-28">
      <DashboardNavbar activeItem={2} />
      <EditReviewBox />
    </main>
  );
};

export default page;
