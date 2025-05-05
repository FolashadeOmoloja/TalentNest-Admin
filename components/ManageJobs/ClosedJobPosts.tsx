import { JobPosted } from "@/utilities/typeDefs";
import { FaArrowLeft } from "react-icons/fa6";
import CTABTN from "../Elements/CTA-Button";
import { useRouter } from "next/navigation";
import { useDeleteCompanyJob } from "@/hooks/jobPosts-hook";
import { useDispatch } from "react-redux";
import { setCompanyJobs } from "@/redux/slices/companyJobsSlice";

const JobPost = ({
  jobData,
  href,
  update,
}: {
  jobData: JobPosted;
  href: string;
  update: boolean;
}) => {
  const { onSubmit: deleteJob, loading } = useDeleteCompanyJob();

  const router = useRouter();
  const dispatch = useDispatch();
  const deleteClosedJob = () => {
    deleteJob(jobData.company._id, jobData._id);
    router.push(href);
  };
  return (
    <main className="section-container relative top-[96px] mt-[50px]">
      <div
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold cursor-pointer"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h3 className="text-[52px] max-md:text-[38px] max-sm:text-3xl font-bold text-[#111013] md:max-w-[500px] leading-[72px] mb-9 mt-10">
        {jobData?.title} <span className="text-[#000089]">(Closed)</span>
      </h3>
      <div className="flex md:gap-7 gap-4  md:text-lg flex-wrap md:mb-[100px] mb-[50px]">
        <span>{jobData?.location}</span>
        <span>
          ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
        </span>
        <span>{jobData?.jobProximity}</span>
        <span>{jobData?.experience} level</span>
      </div>
      <section>
        <span className="md:text-2xl text-lg font-bold mb-4 inline-block">
          Description
        </span>
        <p className="tracking-[0.02em] leading-6 text-[#161519]">
          {jobData?.description}
        </p>
      </section>
      <div>
        <span className="mt-20 mb-4 md:text-2xl text-lg font-bold inline-block">
          Skills
        </span>
        <div className="flex gap-4 flex-wrap mb-16">
          {jobData?.skills.map((opt: string, idx: number) => (
            <span
              key={idx}
              className="text-sm h-11 min-w-32 bg-[#010D3E] rounded-md flex items-center justify-center px-2 text-white font-semibold"
            >
              {opt}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="mb-4 md:text-2xl text-lg font-bold inline-block">
          Experience
        </span>
        <span className="block md:text-lg">{jobData?.experience} level</span>
      </div>
      <div className="my-14">
        <span className="mb-4 md:text-2xl font-bold inline-block ">
          Salary Range
        </span>
        <span className="block md:text-lg">
          ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
        </span>
      </div>

      <div className="pb-14">
        <CTABTN
          route={""}
          isFunc
          func={deleteClosedJob}
          CTA={loading ? "Deleting. . ." : "Delete job"}
          backGround="bg-red-800"
          width="w-[200px] max-xxsm:w-full"
        />
      </div>
    </main>
  );
};
export default JobPost;
