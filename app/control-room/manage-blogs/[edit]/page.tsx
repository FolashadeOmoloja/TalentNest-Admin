import EditBlog from "@/components/ManageBlogs/EditBlog";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { myJobsId: string } }) => {
  return (
    <main className=" pb-28">
      <DashboardNavbar />
      <EditBlog />
    </main>
  );
};

export default page;
