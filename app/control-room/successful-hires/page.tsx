import SuccessHireTable from "@/components/SuccessHireTable";
import DashboardNavbar from "@/components/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <SuccessHireTable />
    </>
  );
};

export default page;
