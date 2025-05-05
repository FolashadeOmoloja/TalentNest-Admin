"use client";

import { companyColumn } from "@/utilities/tableData";
import { userCompanyObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import MainTable from "../Elements/Table/MainTable";
import { useGetAllCompanies } from "@/hooks/admin-analytics-hook";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

type IsActiveState = {
  [key: number]: boolean;
};
const CompanyTable = () => {
  const filterArr = [
    "Registered Companies",
    "Companies Recruiting",
    // "Companies InActive",
  ];
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const { companies, loading } = useGetAllCompanies();
  const router = useRouter();

  const filterCompanies = (accountStatus: string) => {
    return companies.filter((company) =>
      //@ts-ignore
      company.accountStatus?.toLowerCase().includes(accountStatus.toLowerCase())
    );
  };
  const recruiting = changeTable === 1 ? filterCompanies("recruiting") : [];

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
      <h2 className="text-2xl font-bold mb-1">Manage TalentNest's Companies</h2>
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
        ) : companies.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<userCompanyObject>
            data={companies}
            columns={companyColumn}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : companies.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <MainTable<userCompanyObject>
            data={recruiting}
            columns={companyColumn}
          />
        )
      ) : null}
    </section>
  );
};

export default CompanyTable;
