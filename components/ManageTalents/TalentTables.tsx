"use client";

import { talentsColumn } from "@/utilities/tableData";
import { userObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import MainTable from "../Elements/Table/MainTable";
import { useGetAllTalents } from "@/hooks/admin-analytics-hook";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

type IsActiveState = {
  [key: number]: boolean;
};
const TalentTable = () => {
  const filterArr = [
    "Registered Talent",
    "TalentNest Talents Pool",
    "Waitlist Talents",
  ];
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const { talents, loading } = useGetAllTalents();
  const router = useRouter();

  const filterTalents = (accountStatus: string) => {
    return talents.filter((talent) =>
      //@ts-ignore
      talent.accountStatus?.toLowerCase().includes(accountStatus.toLowerCase())
    );
  };
  const shortList = changeTable === 1 ? filterTalents("shortlist") : [];
  const waitList = changeTable === 2 ? filterTalents("waitlist") : [];

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx);
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
      <h2 className="text-2xl font-bold mb-1 bg-text">
        Manage TalentNest's Talent Pool
      </h2>
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
        ) : talents.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<userObject> data={talents} columns={talentsColumn} />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : talents.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<userObject> data={shortList} columns={talentsColumn} />
        )
      ) : changeTable === 2 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : talents.length === 0 ? (
          <p className="mt-10 text-[#010D3E] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<userObject> data={waitList} columns={talentsColumn} />
        )
      ) : null}
    </section>
  );
};

export default TalentTable;
