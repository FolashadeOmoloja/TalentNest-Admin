"use client";

import { useGetAllAdmins } from "@/hooks/admin-users-hook";
import MainTable from "../Elements/Table/MainTable";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Admin } from "@/utilities/typeDefs";
import { adminColumn } from "@/utilities/tableData";

const AdminTable = () => {
  const { admins, loading } = useGetAllAdmins();
  const router = useRouter();

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.push("/control-room")}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1 bg-text">Manage Admins</h2>
      <span className="text-gray-500">Overview of TalentNest Admins</span>
      <div className="flex w-full text-[#010D3E] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
        <span
          className={`tab active max-sm:h-[50px]`}
          style={{ justifyContent: "flex-start" }}
        >
          Admin profile
        </span>
      </div>

      {loading ? (
        <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
      ) : admins.length === 0 ? (
        <p className="mt-10 text-[#010D3E] italic text-2xl">
          No data available at the moment.
        </p>
      ) : (
        <MainTable<Admin> data={admins} columns={adminColumn} />
      )}

      <button
        onClick={() => router.push("/control-room/manage-admins/register")}
        className="table-btn"
      >
        Register New Admin
      </button>
    </section>
  );
};

export default AdminTable;
