"use client";
import {
  ApplicationsColumns,
  InterviewColumns,
  ShortListColumns,
} from "@/utilities/tableData";
import { Applicants } from "@/utilities/typeDefs";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import MainTable from "../Elements/Table/MainTable";
import { useRouter } from "next/navigation";
import TalentMatchProgress from "./ResumeMatch";
import React from "react";
import {
  setActive,
  setChangeTable,
} from "@/redux/slices/scheduledMeetingSlice";

type IsActiveState = {
  [key: number]: boolean;
};
const ApplicationsTable = () => {
  const { application } = useSelector((store: any) => store.application);
  const { jobId } = useSelector((store: any) => store.application);
  const filterArr = [
    ["Application", "Appl."],
    ["Shortlisted", "Shortl."],
    ["Interviews", "Interv."],
    ["Hired", "Hir."],
    ["Declined", "Decl."],
  ];
  const { changeTable, active } = useSelector(
    (store: any) => store.scheduledMeeting
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const filterApplications = (status: string) => {
    return application.filter((application: { status: string }) =>
      application.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  const underReview =
    changeTable === 0 ? filterApplications("under review") : [];
  const shortlist = changeTable === 1 ? filterApplications("shortlisted") : [];
  const interview = changeTable === 2 ? filterApplications("interview") : [];
  const hired = changeTable === 3 ? filterApplications("hired") : [];
  const declined = changeTable === 4 ? filterApplications("declined") : [];

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    dispatch(setActive(newState));
    dispatch(setChangeTable(idx));
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
      <h2 className="text-2xl font-bold mb-1 bg-text">
        Manage Talent's Application for Job Post
      </h2>
      <div className="flex w-full font-bold mt-16 mb-5 border-b border-[#CCD2D9] ">
        {filterArr.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`tab ${
                active[idx] ? "active" : ""
              } max-sm:h-[30px] max-[500px]:text-xs max-lsm:hidden`}
              onClick={() => activeFunc(idx)}
            >
              {item[0]}
            </span>
            <span
              className={`tab ${
                active[idx] ? "active" : ""
              } max-sm:h-[30px] lsm:hidden text-xs`}
              onClick={() => activeFunc(idx)}
            >
              {item[1]}
            </span>
          </React.Fragment>
        ))}
      </div>
      {changeTable === 0 ? (
        underReview.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <>
            <MainTable<Applicants>
              data={underReview}
              columns={ApplicationsColumns}
              borderNone="border-none"
            />
            <TalentMatchProgress jobId={jobId} activeFunc={activeFunc} />
          </>
        )
      ) : changeTable === 1 ? (
        shortlist.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={shortlist}
            columns={ShortListColumns}
            borderNone="border-none"
          />
        )
      ) : changeTable === 2 ? (
        interview.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<Applicants>
            data={interview}
            columns={InterviewColumns}
            borderNone="border-none"
          />
        )
      ) : changeTable === 3 ? (
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
      ) : changeTable === 4 ? (
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
