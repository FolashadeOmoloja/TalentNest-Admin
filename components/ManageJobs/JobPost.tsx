import { useGetAllCompanies } from "@/hooks/admin-analytics-hook";
import { JobPosted, userCompanyObject } from "@/utilities/typeDefs";
import CTABTN from "../Elements/CTA-Button";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/slices/companySlice";
import { useRouter } from "next/navigation";
import { useGetApplicants } from "@/hooks/application-hook";
import { setJob } from "@/redux/slices/jobSlice";
import JobContent from "./JobContent";

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
    <JobContent
      buttonDiv={
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
      }
      jobData={jobData}
    />
  );
};
export default JobPost;
