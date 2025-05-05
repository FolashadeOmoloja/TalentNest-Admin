import CreateBlog from "@/components/ManageBlogs/CreateBlog";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={1} />
      <CreateBlog />
    </>
  );
};
export default page;
