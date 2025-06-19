"use client";

import ProfileBox, {
  DownloadResumeBox,
} from "@/components/Elements/ProfileBox";
import {
  useDeleteCompanyProfile,
  useDeleteTalentProfile,
} from "@/hooks/admin-analytics-hook";
import { useGetAllCompanyEmployed } from "@/hooks/application-hook";
import { useGetCompanyJobs } from "@/hooks/jobPosts-hook";
import { userObject, userCompanyObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import ScheduleModal from "../Elements/Schedule/Modal";

type ProfileDetailsProps<T extends boolean> = {
  skillsBool: T;
  user: T extends true ? userObject : userCompanyObject;
};

const ProfileDetails = <T extends boolean>({
  skillsBool,
  user,
}: ProfileDetailsProps<T>) => {
  const { loading } = useSelector((store: any) => store.auth);
  return (
    <section className="basis-[70%]">
      <section
        className={`bg-white rounded-2xl shadow-md  lg:h-full p-9 max-slg:p-7 max-sm:px-4 transition duration-500`}
      >
        {skillsBool ? (
          <TalentProfile user={user as userObject} />
        ) : (
          <CompanyProfile user={user as userCompanyObject} loading={loading} />
        )}
      </section>
    </section>
  );
};

export default ProfileDetails;

const CompanyProfile = ({
  user,
  loading,
}: {
  user: userCompanyObject;
  loading: boolean;
}) => {
  const { fetchJobs } = useGetCompanyJobs();
  const { fetchApplicants } = useGetAllCompanyEmployed();
  const viewJobs = () => {
    fetchApplicants(user._id);
    fetchJobs(user._id);
  };
  const { onSubmit: deleteCompany } = useDeleteCompanyProfile();
  const deleteCompanyProfile = () => {
    deleteCompany(user._id);
  };
  return (
    <section>
      <ProfileBox title={"Company Name"} details={`${user?.companyName} `} />
      <ProfileBox
        title={"Full Name"}
        details={`${user?.firstName} ${user?.lastName}`}
      />
      <ProfileBox title={"Role"} details={user?.companyRole} />
      <ProfileBox title={"Email Address"} details={user?.emailAddress} />
      <ProfileBox
        title={"Mobile Number"}
        details={user?.countryCode + user?.phoneNumber}
      />
      <ProfileBox
        title={"Industry"}
        details={`${(user as userCompanyObject)?.industry.join(", ")} `}
      />
      <ProfileBox title={"Work Culture"} details={user?.preference} />
      <button
        className="py-4 px-6 bg-[#001E80] text-white rounded-md font-semibold mt-14 "
        onClick={viewJobs}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Fetching Jobs
          </div>
        ) : (
          "View jobs posted"
        )}
      </button>
      <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
        (View all jobs posted by company)
      </span>
      <div>
        <ScheduleModal func={() => {}} talentBool={false} text="text-base" />
        <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
          (Schedule Meeting with company)
        </span>
      </div>

      <div>
        <button
          className="py-4 px-6 bg-red-700 text-white rounded-md font-semibold mt-6 btn-hover hover:bg-red-800"
          onClick={deleteCompanyProfile}
        >
          Delete Company's Profile
        </button>
        <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
          (Delete profile permanently from database)
        </span>
      </div>
    </section>
  );
};

const TalentProfile = ({ user }: { user: userObject }) => {
  const { onSubmit: deleteTalent } = useDeleteTalentProfile();
  const deleteProfile = () => {
    deleteTalent(user._id);
  };
  return (
    <section>
      <ProfileBox
        title={"Full Name"}
        details={`${user?.firstName} ${user.lastName}`}
      />
      <ProfileBox title={"Email Address"} details={user.emailAddress} />
      <ProfileBox
        title={"Mobile Number"}
        details={user?.countryCode + user?.phoneNumber}
      />
      <ProfileBox
        title={"Experience Level"}
        details={`${user?.experienceLevel} `}
      />
      <ProfileBox
        title={"Years of Experience"}
        details={`${user?.experienceYears} `}
      />
      <ProfileBox title={"Industry"} details={user?.industry} />
      <ProfileBox title={"Work mode preference"} details={user?.preference} />
      <DownloadResumeBox title={"Resume"} filename={user?.resume} />
      <ProfileBox
        title={"Primary Skills to offer"}
        details={`${user?.skills.join(",")} `}
      />

      <div>
        <button
          className="py-4 px-6 bg-red-700 text-white rounded-md font-semibold mt-14 btn-hover hover:bg-red-800"
          onClick={deleteProfile}
        >
          Delete Talent Profile
        </button>
        <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
          (Delete profile permanently from database)
        </span>
      </div>
    </section>
  );
};
