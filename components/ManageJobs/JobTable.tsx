"use client";

import { useEffect, useState } from "react";
import MainTable from "../Elements/Table/MainTable";
import { companyActiveColumns, closedJobsColumns } from "@/utilities/tableData";
import { JobPosted } from "@/utilities/typeDefs";

import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetAllJobs } from "@/hooks/jobPosts-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type IsActiveState = {
  [key: number]: boolean;
};

const JobTable = () => {
  const filterArr = ["Active Jobs", "Closed Jobs"];
  const { jobs, loading } = useGetAllJobs();
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const router = useRouter();

  // Function to filter jobs based on status
  const filterJobs = (status: string) => {
    return jobs.filter((job) =>
      //@ts-ignore
      job.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  // Recalculate the jobs when `jobs` or `changeTable` changes
  const openedJobs = changeTable === 0 ? filterJobs("open") : [];
  const closedJobs = changeTable === 1 ? filterJobs("closed") : [];

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx); // Change the table based on active tab index
  };

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.push("/control-room")}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1">
        Job Listings of TalentNest's companies
      </h2>
      <span className="text-[#7C8698]">
        TalentNest's complete job list overview
      </span>
      <div className="flex w-full text-[#626263] md:text-lg font-bold mt-16 border-b border-[#CCD2D9]">
        {filterArr.map((item, idx) => (
          <span
            className={`tab ${active[idx] ? "active" : ""} max-sm:h-[50px]`}
            key={idx}
            onClick={() => activeFunc(idx)}
          >
            {item}
          </span>
        ))}
      </div>

      {changeTable === 0 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : openedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<JobPosted>
            data={openedJobs}
            columns={companyActiveColumns}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : closedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<JobPosted> data={closedJobs} columns={closedJobsColumns} />
        )
      ) : null}
    </section>
  );
};

export default JobTable;
