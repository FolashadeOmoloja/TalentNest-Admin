"use client";

import { useState } from "react";
import MainTable from "../Elements/Table/MainTable";
import {
  singleCompanyColumns,
  singleCompClosedJobsColumns,
  successHireColumns,
} from "@/utilities/tableData";
import { JobPosted, SuccessApplications } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type IsActiveState = {
  [key: number]: boolean;
};

const CompanyJobTable = () => {
  const filterArr = ["Active Jobs", "Closed Jobs", "Hired Talents"];
  const { companyJobs: jobs } = useSelector((store: any) => store.companyJobs);
  const { successApplicants } = useSelector(
    (store: any) => store.successApplicants
  );

  const { loading } = useSelector((store: any) => store.auth);
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const router = useRouter();
  const companyName = jobs[0]?.company?.companyName;

  // Function to filter jobs based on status
  const filterJobs = (status: string) => {
    return jobs.filter((job: { status: string }) =>
      job.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  const openedJobs = changeTable === 0 ? filterJobs("open") : [];
  const closedJobs = changeTable === 1 ? filterJobs("closed") : [];
  const hiredCandidates = changeTable === 2 ? successApplicants : [];

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx);
  };

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.push("/control-room/manage-companies")}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1 bg-text">
        {companyName} Job Postings
      </h2>
      <span className="text-gray-500">Complete job post overview</span>
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
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<JobPosted>
            data={openedJobs}
            columns={singleCompanyColumns}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : closedJobs.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<JobPosted>
            data={closedJobs}
            columns={singleCompClosedJobsColumns}
          />
        )
      ) : changeTable === 2 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : hiredCandidates.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<SuccessApplications>
            data={hiredCandidates}
            columns={successHireColumns}
          />
        )
      ) : null}
    </section>
  );
};

export default CompanyJobTable;
