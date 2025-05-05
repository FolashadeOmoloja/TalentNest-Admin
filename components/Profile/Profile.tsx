import { userCompanyObject, userObject } from "@/utilities/typeDefs";
import LeftSection, { HireLeftSection } from "./LeftSection";
import ProfileDetails from "./ProfileDetails";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Profile = ({
  skillsBool,
  user,
}: {
  skillsBool: boolean;
  user: object;
}) => {
  const router = useRouter();
  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.back()}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <section className="flex max-md:flex-col gap-14 max-slg:gap-8">
        {skillsBool ? (
          <LeftSection user={user as userObject} />
        ) : (
          <HireLeftSection user={user as userCompanyObject} />
        )}
        <ProfileDetails skillsBool={skillsBool} user={user as userObject} />
      </section>
    </section>
  );
};

export default Profile;
