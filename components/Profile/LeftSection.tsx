import ProfilePhotoHandler from "@/components/Elements/profilePhotoHandler";
import { useUpdateTalentProfileStatus } from "@/hooks/admin-analytics-hook";
import { userCompanyObject, userObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

const LeftSection = ({ user }: { user: userObject }) => {
  const { onSubmit: update, loading } = useUpdateTalentProfileStatus();
  const changeStatus = () => {
    const updatedStatus: Record<string, any> = {};
    updatedStatus["accountStatus"] = "Shortlist";
    update(updatedStatus, user._id);
  };
  return (
    <aside className="basis-[30%] flex flex-col gap-10">
      <div className="bg-white rounded-md h-[680px] flex flex-col px-4 centered ">
        <ProfilePhotoHandler user={user} talent />
        <span className="font-semibold text-3xl mt-8">
          {user.firstName} {user.lastName}
        </span>
        <span className="font-bold text-gray-500 mt-6">{user.profession}</span>
        <span className="font-bold text-gray-500 mt-6">
          {" "}
          Profile status: {user.accountStatus}
        </span>
        <span className="font-bold text-gray-500 mt-6">
          {user.location}, {user.country}
        </span>
        {user.accountStatus == "Waitlist" ? (
          <div>
            <button
              className="py-4 px-6 centered bg-[#010D3E] text-white rounded-md font-semibold mt-11"
              onClick={changeStatus}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
              ) : (
                "Update Profile Status"
              )}
            </button>
            <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold text-center italic block">
              (Update profile to shortlist)
            </span>
          </div>
        ) : (
          <div className="py-4 px-6 centered bg-gray-600 text-white rounded-md font-semibold mt-11">
            Profile Status Updated
          </div>
        )}
      </div>
      <div className="bg-white rounded-md  flex justify-between gap-7 p-6 max-xsm:flex-col max-xsm:gap-4 max-xsm:p-4">
        <span className="text-[#0A66C2] text-3xl">
          <FaLinkedin />
        </span>
        <span className="text-sm text-gray-500 font-semibold text-wrap">
          {user.linkedInUrl}
        </span>
      </div>
    </aside>
  );
};

export default LeftSection;

export const HireLeftSection = ({ user }: { user: userCompanyObject }) => {
  return (
    <aside className="basis-[30%] flex flex-col gap-10">
      <div className="bg-white rounded-md h-[680px] flex flex-col px-4 centered ">
        <ProfilePhotoHandler user={user} talent={false} />
        <span className="font-semibold text-3xl mt-8">{user?.companyName}</span>
        <span className="font-bold text-gray-500 mt-6">
          {user?.industry.join(",")}
        </span>
        <span className="font-bold text-gray-500 mt-6">
          {user?.location}, {user?.country}
        </span>
        <div className="py-4 px-6 centered bg-[#010D3E] text-white rounded-md font-semibold mt-11">
          Profile status: {user?.accountStatus}
        </div>
      </div>
      <div className="bg-white rounded-md  flex justify-between gap-7 p-6 max-xsm:flex-col max-xsm:gap-4 max-xsm:p-4">
        <span className="text-[#0A66C2] text-3xl">
          <FaLinkedin />
        </span>
        <span className="text-sm text-gray-500 font-semibold">
          {user?.linkedInUrl}
        </span>
      </div>
    </aside>
  );
};
