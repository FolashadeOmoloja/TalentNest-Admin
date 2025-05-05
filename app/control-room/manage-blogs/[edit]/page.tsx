import EditBlog from "@/components/ManageBlogs/EditBlog";
import DashboardNavbar from "@/components/Navbar/Navbar";

const page = ({ params }: { params: { myJobsId: string } }) => {
  return (
    <main className="bg-[#F4F5F7] pb-28">
      <DashboardNavbar activeItem={1} />
      <EditBlog />
    </main>
  );
};

export default page;
