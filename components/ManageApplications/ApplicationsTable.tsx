"use client";
import loading from "@/app/loading";
import { ApplicationsColumns, companyColumn } from "@/utilities/tableData";
import { Applicants, userCompanyObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import MainTable from "../Elements/Table/MainTable";
import { useRouter } from "next/navigation";

type IsActiveState = {
  [key: number]: boolean;
};
const ApplicationsTable = () => {
  const { application } = useSelector((store: any) => store.application);
  const filterArr = [
    "Active Application",
    "Shortlisted Talents",
    "Hired Talents",
    "Declined",
  ];
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const router = useRouter();

  const filterApplications = (status: string) => {
    return application.filter((application: { status: string }) =>
      application.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  const underReview =
    changeTable === 0 ? filterApplications("under review") : [];
  const interview = changeTable === 1 ? filterApplications("interview") : [];
  const hired = changeTable === 2 ? filterApplications("hired") : [];
  const declined = changeTable === 3 ? filterApplications("declined") : [];
  console.log(underReview);
  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx);
  };

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.back()}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1">
        Manage Talent's Application for Job Post
      </h2>
      <div className="flex w-full text-[#626263] md:text-lg font-bold mt-16 mb-5 border-b border-[#CCD2D9]">
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
        underReview.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={underReview}
            columns={ApplicationsColumns}
            borderNone="border-none"
          />
        )
      ) : changeTable === 1 ? (
        interview.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={interview}
            columns={ApplicationsColumns}
            borderNone="border-none"
          />
        )
      ) : changeTable === 2 ? (
        hired.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={hired}
            columns={ApplicationsColumns}
            borderNone="border-none"
          />
        )
      ) : changeTable === 3 ? (
        declined.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={declined}
            columns={ApplicationsColumns}
            borderNone="border-none"
          />
        )
      ) : null}
    </section>
  );
};

export default ApplicationsTable;
