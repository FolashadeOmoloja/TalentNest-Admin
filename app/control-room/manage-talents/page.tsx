import TalentTable from "@/components/ManageTalents/TalentTables";
import DashboardNavbar from "@/components/Navbar/Navbar";

const ManageTalents = () => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <TalentTable />
    </>
  );
};

export default ManageTalents;
