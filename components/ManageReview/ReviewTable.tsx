"use client";

import { useGetAllReviews } from "@/hooks/info-hook";
import MainTable from "../Elements/Table/MainTable";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Reviews } from "@/utilities/typeDefs";
import { reviewColumns } from "@/utilities/tableData";

const ReviewTable = () => {
  const { reviews, loading } = useGetAllReviews();
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
      <h2 className="text-2xl font-bold mb-1 bg-text">
        Manage Experiences/ Reviews
      </h2>
      <span className="text-gray-500">
        Overview of users experiences on TalentNest
      </span>
      <div className="flex w-full text-[#010D3E] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
        <span
          className={`tab active max-sm:h-[50px] w-full`}
          style={{ justifyContent: "flex-start" }}
        >
          The Nest Experience
        </span>
      </div>

      {loading ? (
        <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
      ) : reviews.length === 0 ? (
        <p className="mt-10 text-[#010D3E] italic text-2xl">
          No data available at the moment.
        </p>
      ) : (
        <MainTable<Reviews> data={reviews} columns={reviewColumns} />
      )}

      <button
        onClick={() => router.push("/control-room/manage-reviews/create")}
        className="table-btn"
      >
        Create Review
      </button>
    </section>
  );
};

export default ReviewTable;
