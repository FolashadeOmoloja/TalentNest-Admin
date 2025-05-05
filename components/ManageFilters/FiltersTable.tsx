"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  AddCountry,
  AddRole,
  AddSkill,
  DeleteCountry,
  DeleteRole,
  DeleteSkill,
  useGetAllFilters,
} from "@/hooks/filters-hook";
import FilterBox from "./FilterBox";

type IsActiveState = {
  [key: number]: boolean;
};

const FilterTable = () => {
  const filterArr = ["Skills Filter", "Country Filter", "Industries"];
  const { filter, loading } = useGetAllFilters();
  const { onSubmit: createSkill } = AddSkill();
  const { onSubmit: createCountry } = AddCountry();
  const { onSubmit: createRole } = AddRole();
  const { onSubmit: removeRole } = DeleteRole();
  const { onSubmit: removeCountry } = DeleteCountry();
  const { onSubmit: removeSkill } = DeleteSkill();
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const router = useRouter();
  console.log(filter);
  console.log(filter._id);

  const skillsFilter =
    changeTable === 0 ? (filter?.skills ? filter.skills : []) : [];
  const countryFilter =
    changeTable === 1 ? (filter?.country ? filter.country : []) : [];
  const roleFilter = changeTable === 2 ? (filter?.role ? filter.role : []) : [];

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
      <h2 className="text-2xl font-bold mb-1 bg-text">
        Manage Dropdowns and job filters
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
        ) : (
          <FilterBox
            initialFilter={skillsFilter ? skillsFilter : []}
            addHook={createSkill}
            deleteHook={removeSkill}
            id={filter._id}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : (
          <FilterBox
            initialFilter={countryFilter ? countryFilter : []}
            addHook={createCountry}
            deleteHook={removeCountry}
            id={filter._id}
          />
        )
      ) : changeTable === 2 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : (
          <FilterBox
            initialFilter={roleFilter ? roleFilter : []}
            addHook={createRole}
            deleteHook={removeRole}
            id={filter._id}
          />
        )
      ) : null}
    </section>
  );
};

export default FilterTable;
