import { useGetAllCompanies } from "@/hooks/admin-analytics-hook";
import { JobPosted, userCompanyObject } from "@/utilities/typeDefs";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import CTABTN from "../Elements/CTA-Button";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/slices/companySlice";
import { useRouter } from "next/navigation";
import { useGetApplicants } from "@/hooks/application-hook";
import { setJob } from "@/redux/slices/jobSlice";

const JobPost = ({ jobData }: { jobData: JobPosted }) => {
  const { companies } = useGetAllCompanies();
  const { fetchApplicants, loading } = useGetApplicants();
  const company = companies.find(
    (company: userCompanyObject) => company._id === jobData.company._id
  );
  const encodeCompanyId = (companyId: string) => {
    return btoa(companyId); // Base64 encode
  };
  const paramCompanyId = encodeCompanyId(jobData.company._id);
  const dispatch = useDispatch();
  const router = useRouter();
  const viewCompany = () => {
    dispatch(setCompany(company));
    router.push(`/control-room/manage-companies/${paramCompanyId}`);
  };

  const viewApplications = () => {
    dispatch(setJob(jobData));
    fetchApplicants(jobData._id);
  };
  return (
    <section className="section-container relative top-[96px] mt-[50px]  max-w-4xl lg:p-0 mx-auto space-y-8">
      <Link
        href={"/dashboard/jobs"}
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
            {jobData.skills.map((opt: string, idx: number) => (
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
      <div className="pb-14 flex max-sm:flex-col gap-5 ">
        <CTABTN
          route={""}
          isFunc
          func={viewCompany}
          CTA={"View Company"}
          backGround="bg-[#010D3E]"
          width="w-[200px] max-xxsm:w-full"
          height2="h-[50px] text-sm"
          showIcon
        />
        <CTABTN
          route={""}
          isFunc
          func={viewApplications}
          CTA={loading ? "fetching. . ." : "View Applications"}
          height2="h-[50px] text-sm"
          width="w-[200px] max-xxsm:w-full"
          showIcon
        />
      </div>
    </section>

    // <main className="section-container relative top-[96px] mt-[50px]">
    //   <Link
    //     href={"/control-room/manage-jobs"}
    //     className="flex text-[#010D3E] gap-3 text-xl items-center font-bold"
    //   >
    //     <FaArrowLeft />
    //     <span>Go back</span>
    //   </Link>
    //   <h3 className="text-[52px] max-md:text-[38px] max-sm:text-3xl font-bold text-[#111013] md:max-w-[500px] leading-[72px] mb-9 mt-10">
    //     {jobData?.title}
    //   </h3>
    //   <div className="flex md:gap-7 gap-4  md:text-lg flex-wrap md:mb-[100px] mb-[50px]">
    //     <span>{jobData?.location}</span>
    //     <span>
    //       ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
    //     </span>
    //     <span>{jobData?.jobProximity}</span>
    //     <span>{jobData?.experience} level</span>
    //   </div>
    //   <section>
    //     <span className="md:text-2xl text-lg font-bold mb-4 inline-block">
    //       Description
    //     </span>
    //     <p className="tracking-[0.02em] leading-6 text-[#161519]">
    //       {jobData?.description}
    //     </p>
    //   </section>
    //   <div>
    //     <span className="mt-20 mb-4 md:text-2xl text-lg font-bold inline-block">
    //       Skills
    //     </span>
    //     <div className="flex gap-4 flex-wrap mb-16">
    //       {jobData?.skills.map((opt: string, idx: number) => (
    //         <span
    //           key={idx}
    //           className="text-sm h-11 min-w-32 bg-[#010D3E] rounded-md flex items-center justify-center px-2 text-white font-semibold"
    //         >
    //           {opt}
    //         </span>
    //       ))}
    //     </div>
    //   </div>
    //   <div>
    //     <span className="mb-4 md:text-2xl text-lg font-bold inline-block">
    //       Experience
    //     </span>
    //     <span className="block md:text-lg">{jobData?.experience} level</span>
    //   </div>
    //   <div className="my-14">
    //     <span className="mb-4 md:text-2xl font-bold inline-block ">
    //       Salary Range
    //     </span>
    //     <span className="block md:text-lg">
    //       ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
    //     </span>
    //   </div>

    // </main>
  );
};
export default JobPost;
