import { JobPosted } from "@/utilities/typeDefs";
import CTABTN from "../Elements/CTA-Button";
import { useRouter } from "next/navigation";
import { useDeleteCompanyJob } from "@/hooks/jobPosts-hook";
import JobContent from "./JobContent";

const JobPost = ({ jobData, href }: { jobData: JobPosted; href: string }) => {
  const { onSubmit: deleteJob, loading } = useDeleteCompanyJob();

  const router = useRouter();
  const deleteClosedJob = () => {
    deleteJob(jobData.company._id, jobData._id);
    router.push(href);
  };
  return (
    <JobContent
      buttonDiv={
        <div className="pb-14">
          <CTABTN
            route={""}
            isFunc
            func={deleteClosedJob}
            CTA={loading ? "Deleting. . ." : "Delete job"}
            backGround="bg-red-800"
            width="w-[200px] max-xxsm:w-full"
            height2="h-[50px]"
          />
        </div>
      }
      jobData={jobData}
    />
  );
};
export default JobPost;
