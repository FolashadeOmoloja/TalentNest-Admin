import { FaCamera } from "react-icons/fa";
import { useRef, ChangeEvent } from "react";
import { userObject, userCompanyObject } from "@/utilities/typeDefs";

import { Loader2 } from "lucide-react";

interface ProfilePhotoProps {
  user: userObject | userCompanyObject;
  talent?: boolean;
}

const ProfilePhotoHandler: React.FC<ProfilePhotoProps> = ({ user, talent }) => {
  return (
    <div className="h-[200px] w-[200px] rounded-full overflow-hidden border-4 border-[#010D3E]">
      {user?.profileImage ? (
        <img
          src={user?.profileImage}
          alt="Profile"
          className="object-center object-cover w-full h-full"
        />
      ) : (
        <div
          className={`w-full h-full text-white text-8xl font-bold centered`}
          style={{ background: user?.hex }}
        >
          {talent
            ? user?.firstName[0]
            : (user as userCompanyObject)?.companyName[0]}
        </div>
      )}
    </div>
  );
};
export default ProfilePhotoHandler;
