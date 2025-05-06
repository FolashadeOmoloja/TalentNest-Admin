import EditFaqBox from "@/components/ManageFaqs/EditFaq";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { Id: string } }) => {
  return (
    <main className=" pb-28">
      <DashboardNavbar />
      <EditFaqBox />
    </main>
  );
};

export default page;
