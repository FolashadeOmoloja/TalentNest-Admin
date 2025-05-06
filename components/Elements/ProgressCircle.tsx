"use client";

import { useGetAllCompanyEmployed } from "@/hooks/application-hook";
import { useGetCompanyJobs } from "@/hooks/jobPosts-hook";
import { userCompanyObject, userObject } from "@/utilities/typeDefs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProgressCircle = ({
  company,
  user,
}: {
  company?: boolean;
  user?: userCompanyObject | userObject;
}) => {
  const [toogleOnTop, setToogleOnTop] = useState(false);
  const [toogleOnBottom, setToogleOnBottom] = useState(true);
  const [text, setText] = useState(company ? "Active Jobs" : "");
  const [fetchedCompany, setFetchedCompany] = useState("");
  const { companyJobs: jobs } = useSelector((store: any) => store.companyJobs);
  const { successApplicants } = useSelector(
    (store: any) => store.successApplicants
  );

  const activeJobs = jobs.filter((job: { status: string }) =>
    job.status?.toLowerCase().includes("open")
  );

  const { fetchJobs } = useGetCompanyJobs();
  const { fetchApplicants } = useGetAllCompanyEmployed();

  const jobPercentage = (activeJobs.length / jobs.length) * 100;
  const hiresPercentage = (successApplicants.length / jobs.length) * 100;
  const [percentage, setPercentage] = useState(company ? jobPercentage : 0);
  //fetches data and calculates the percentage
  useEffect(() => {
    if (company) {
      fetchApplicants((user as userCompanyObject)?._id);
      fetchJobs((user as userCompanyObject)?._id);
      setFetchedCompany((user as userCompanyObject)?._id);
    }
  }, [user]);

  useEffect(() => {
    if (company) {
      setPercentage(toogleOnTop ? jobPercentage : hiresPercentage);
    }
  }, [toogleOnTop, fetchedCompany]);
  const toggleSwitchTop = () => {
    setToogleOnTop(!toogleOnTop);
    setToogleOnBottom(!toogleOnBottom);
    if (company) {
      setText("Active Jobs");
    }
  };

  const toggleSwitchBottom = () => {
    setToogleOnBottom(!toogleOnBottom);
    setToogleOnTop(!toogleOnTop);
    if (company) {
      setText("Successful Hires");
    }
  };

  return (
    <div className="py-3">
      <p className="font-semibold text-center ">
        {company ? "Company Stats" : "Talent Stats"}
      </p>
      <div className="flex centered">
        <ProgressBar percentage={percentage} text={text} />

        {/* Switch Container */}
        <div className="w-[18px] h-[72px] bg-[#ECF7EA] rounded-[10px]  flex flex-col overflow-hidden border-[1.5px] border-[#001e803f]">
          <div
            onClick={toggleSwitchTop}
            className={`w-[18px] h-[36px] cursor-pointer transition-all duration-100 ${
              toogleOnTop ? "bg-[#001E80]" : ""
            }`}
          />
          <div
            onClick={toggleSwitchBottom}
            className={`w-[18px] h-[36px] cursor-pointer transition-all duration-100 ${
              toogleOnBottom ? "bg-[#001E80]" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;

interface ProgressBarProps {
  percentage: number;
  text?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  text = "Total number Of Loan",
}) => {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  let strokeColor = "#010D3E";
  if (percentage >= 70) {
    strokeColor = "#001E80";
  } else if (percentage >= 40) {
    strokeColor = "#4895EF";
  } else {
    strokeColor = "#B00020";
  }

  return (
    <div className="flex justify-center items-center">
      <svg
        width={250}
        height={250}
        viewBox={`0 0 250 250`}
        className="relative"
      >
        <circle
          cx={125}
          cy={125}
          strokeWidth="15"
          r={radius}
          className=""
          style={{ stroke: "#ECF7EA", fill: "none" }}
        />
        <circle
          cx={125}
          cy={125}
          strokeWidth="15"
          r={radius}
          className=""
          style={{
            stroke: strokeColor,
            fill: "none",
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
          transform={`rotate(-90 125 125)`}
        />
        <text
          x="50%"
          y="40%"
          dy="0.3em"
          textAnchor="middle"
          className="text-xs font-medium fill-gray-700"
        >
          {text}
        </text>
        <text
          x="50%"
          y="55%"
          dy="0.3em"
          textAnchor="middle"
          className="text-2xl font-bold fill-gray-800"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};
