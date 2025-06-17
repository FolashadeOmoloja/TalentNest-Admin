import { JobPosted } from "@/utilities/typeDefs";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const JobContent = ({
  buttonDiv,
  jobData,
}: {
  buttonDiv: React.ReactNode;
  jobData: JobPosted;
}) => {
  return (
    <section className="section-container relative top-[96px] mt-[50px]  max-w-4xl lg:p-0 mx-auto space-y-8">
      <Link
        href={"/control-room/manage-jobs"}
        className="flex text-[#010d3e] hover:text-black gap-3 text-xl items-center font-bold"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </Link>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-5xl font-bold text-[#010D3E] mb-5">
          {jobData?.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            📍 {jobData?.location}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            💼 {jobData?.experience}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            🖥 {jobData?.jobProximity}
          </span>
          <span className="bg-blue-100 text-[#001354] px-3 py-1 rounded-full">
            💰 ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-sm:p-4 space-y-8">
        {/* Description */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed tracking-[0.02em]">
            {jobData?.description}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {jobData?.skills.map((opt: string, idx: number) => (
              <span
                key={opt}
                className="bg-[#010D3E] text-white text-sm px-4 py-1.5 rounded-full"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Salary */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Experience
            </h2>
            <p className="text-sm text-gray-700 font-medium">
              {jobData?.experience}
            </p>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Salary Range
            </h2>
            <p className="text-sm text-gray-700 font-medium">
              {" "}
              ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
            </p>
          </div>
        </div>
      </div>
      {/*button */}
      {buttonDiv}
    </section>
  );
};

export default JobContent;
