import FaqTable from "@/components/ManageFaqs/FaqTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={3} />
      <FaqTable />
    </>
  );
};
export default page;
