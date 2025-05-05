"use client";

import MainTable from "@/components/Elements/Table/MainTable";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { successHireColumns } from "@/utilities/tableData";
import { SuccessApplications } from "@/utilities/typeDefs";
import { useGetAllEmployed } from "@/hooks/application-hook";

const SuccessHireTable = () => {
  const { successApplications, loading } = useGetAllEmployed();
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
      <h2 className="text-2xl font-bold mb-1">Successful Job Placements</h2>
      <span className="text-gray-500">Summary of completed hires</span>
      <div className="flex w-full text-[#010D3E] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
        <span className={`tab active max-sm:h-[50px]`}>
          Completed Hires Review
        </span>
      </div>

      {loading ? (
        <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
      ) : successApplications.length === 0 ? (
        <p className="mt-10 text-[#010D3E] italic text-2xl">
          No data available at the moment.
        </p>
      ) : (
        <MainTable<SuccessApplications>
          data={successApplications}
          columns={successHireColumns}
        />
      )}
    </section>
  );
};

export default SuccessHireTable;
