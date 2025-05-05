import CreateFaqBox from "@/components/ManageFaqs/CreateFaq";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={3} />
      <CreateFaqBox />
    </>
  );
};
export default page;
