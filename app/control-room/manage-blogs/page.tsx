import BlogTable from "@/components/ManageBlogs/BlogTable";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={1} />
      <BlogTable />
    </>
  );
};
export default page;
