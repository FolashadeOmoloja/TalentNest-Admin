import CompanyTable from "@/components/manageCompanies/CompanyTables";
import DashboardNavbar from "@/components/Navbar/Navbar";
const ManageCompanies = () => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <CompanyTable />
    </>
  );
};
export default ManageCompanies;
