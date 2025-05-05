import EditFaqBox from "@/components/ManageFaqs/EditFaq";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { Id: string } }) => {
  return (
    <main className="bg-[#F4F5F7] pb-28">
      <DashboardNavbar activeItem={2} />
      <EditFaqBox />
    </main>
  );
};

export default page;
