import { updateApplicationStatus } from "@/hooks/application-hook";
import { setTalent } from "@/redux/slices/talentSlice";
import { Applicants } from "@/utilities/typeDefs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaCaretDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const ApplicantsCard = ({ item, idx }: { item: Applicants; idx: number }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const encodedId = btoa(item.talent._id as string);
  const visitProfile = () => {
    dispatch(setTalent(item.talent));
    router.push(`/control-room/manage-talents/${encodedId}`);
  };
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { loading, handleUpdate } = updateApplicationStatus();

  const statuses = ["Under Review", "Interview", "Hired", "Declined"];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleStatusUpdate = (status: string) => {
    setDropdownVisible(false);
    handleUpdate(status, item._id, item.job);
  };
  return (
    <section className="py-6">
      <div className="rounded-lg w-full p-5 border-[#22cbeda6] border-2">
        <div className=" flex justify-between max-sm:flex-col max-sm:gap-5 max-sm:items-center max-sm:text-center">
          <div className="text-sm flex flex-col basis-1/2 justify-between max-sm:gap-3">
            <div className="w-[200px] h-[200px]  rounded-lg">
              {item.talent.profileImage ? (
                <img
                  src={item.talent.profileImage}
                  alt=""
                  className="object-center object-cover w-full h-full rounded-lg"
                />
              ) : (
                <section
                  className={`w-[200px] h-[200px]  text-5xl text-white  font-bold centered bg-[#010D3E]  rounded-lg`}
                >
                  {item.talent.firstName[0]}
                </section>
              )}
            </div>
            <p className="font-semibold">
              Name: {item.talent.firstName} {item.talent.lastName}
            </p>
            <p className="font-semibold">
              Profession: {item.talent.profession}, ({item.talent.industry})
            </p>
          </div>
          <div className="text-sm basis-1/2 flex flex-col gap-3">
            <span className="font-bold text-[16px]">Talents Details</span>
            <span className="font-semibold">
              Email:{" "}
              <span className="font-normal">{item.talent.emailAddress}</span>
            </span>
            <span className="font-semibold">
              LinkedIn Url:{" "}
              <a
                className="font-bold text-[#010D3E] underline underline-offset-2 "
                href={item.talent.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.talent.linkedInUrl}
              </a>
            </span>
            <span className="font-semibold">
              Years of Experience:{" "}
              <span className="font-normal">{item.talent.experienceYears}</span>
            </span>
            <span className="font-semibold">
              Level of EXperience:{" "}
              <span className="font-normal">{item.talent.experienceLevel}</span>{" "}
            </span>
            <span className="font-semibold">
              Location:{" "}
              <span className="font-normal">
                {item.talent.location} {item.talent.country}
              </span>{" "}
            </span>
            <span className="font-semibold">
              Skills:{" "}
              <span className="font-normal">
                {item.talent.skills.join(", ")}
              </span>
            </span>
            <span className="font-semibold">
              Resume:{" "}
              <a
                className="font-bold text-[#010D3E] underline underline-offset-2 "
                href={item?.talent.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.talent.resumeOriginalName}
              </a>
            </span>
            <span className="font-semibold">
              Application status:{" "}
              <span className="font-normal">{item.status}</span>
            </span>
          </div>
        </div>
        <div className="mt-5">
          <div className="p-3 text-[#010D3E] text-lg flex justify-between border rounded-sm font-bold items-center max-xsm:text-sm transition duration-300">
            <div className="relative">
              {isDropdownVisible && (
                <div className="absolute top-[-150px] text-black text-sm left-0 bg-white shadow-lg p-3  z-10 border rounded-md xxsm:w-[180px]">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      className="block w-full text-left p-1 hover:bg-[#010D3E] hover:text-white cursor-pointer"
                      onClick={() => handleStatusUpdate(status)}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : status}
                    </button>
                  ))}
                </div>
              )}
              <div
                className="flex gap-3 items-center cursor-pointer link-animate"
                onClick={toggleDropdown}
              >
                <span>Update Status</span>
                <FaCaretDown />
              </div>
            </div>
            <div
              className="flex gap-3 items-center cursor-pointer link-animate "
              onClick={visitProfile}
            >
              <span>Visit Profile</span>
              <FaArrowRight className="icon-animate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicantsCard;
