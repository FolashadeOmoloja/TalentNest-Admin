import { updateApplicationStatus } from "@/hooks/application-hook";
import { setTalent } from "@/redux/slices/talentSlice";
import { Applicants } from "@/utilities/typeDefs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaCaretDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const ApplicantsCard = ({item,isUnderReview = true}: {  item: Applicants;  isUnderReview?: boolean;}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const encodedId = btoa(item?.talent._id as string);
  const visitProfile = () => {  dispatch(setTalent(item?.talent));  router.push(`/control-room/manage-talents/${encodedId}`) };
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { loading, handleUpdate } = updateApplicationStatus();

  const statuses = ["Interview", "Hired", "Declined"];

  const toggleDropdown = () => {setDropdownVisible(!isDropdownVisible) };

  const handleStatusUpdate = (status: string) => { setDropdownVisible(false); handleUpdate(status, item._id, item.job)};
  return (
    <section className="py-6">
      <div className="rounded-lg w-full p-5 border-[#001E80] border-2">
        <div className=" flex justify-between max-sm:flex-col max-sm:gap-5 max-sm:items-center max-sm:text-center">
              <div className="text-sm flex flex-col basis-1/2 justify-between max-sm:gap-3">
                <div className="w-[200px] h-[200px]  rounded-lg">
                  {item.talent.profileImage ? (
                    <img src={item.talent.profileImage} className="object-center object-cover w-full h-full rounded-lg"/>
                  ) : (
                    <section className={`w-[200px] h-[200px]  text-5xl text-white  font-bold centered bg-[#010D3E]  rounded-lg`} > {item.talent.firstName[0]} </section>
                  )}
                </div>
                <p className="font-semibold"> Name: {item.talent.firstName} {item.talent.lastName}</p>
                <p className="font-semibold"> Profession: {item.talent.profession}, ({item.talent.industry})</p>
          </div>
          <div className="text-sm basis-1/2 flex flex-col gap-3">
              <span className="font-bold text-[16px] text-[#001E80]">  Talents Details</span>
              <DetailsCard title="Email:" details={item.talent.emailAddress} />
              <DetailsCard title="LinkedIn Url:" details={item.talent.linkedInUrl} href={item.talent.linkedInUrl}/>
              <DetailsCard title="Years of Experience:" details={item.talent.experienceYears}/>
              <DetailsCard title="Level of Experience:" details={item.talent.experienceLevel}/>
              <DetailsCard title="Location:" details={`${item.talent.location} ${item.talent.country}`} />
              <DetailsCard title="Skills:" details={item.talent.skills.join(", ")}/>
              <DetailsCard title="Resume:" details={item.talent.resumeOriginalName} href={item?.talent.resume}/>
              <DetailsCard title="Application status:" details={item.status} />
              {isUnderReview === false && (
                <DetailsCard title="Match Percentage:" match details={`${(item.score * 100).toFixed(2)}%`}/>
            )}
          </div>
        </div>
        {/*update status and visit profile for scheduling */}
        {isUnderReview === false && (
          <div className="mt-5">
            <div className="p-3 text-[#001E80] text-lg flex justify-between bg-white rounded-sm font-bold items-center max-xsm:text-sm transition duration-300">
              <div className="relative">
                {isDropdownVisible && (
                  <div className="absolute top-[-150px] text-black text-sm left-0 bg-white shadow-lg p-3  z-10 border rounded-md xxsm:w-[180px]">
                    {statuses.map((status) => (
                      <button key={status} className="block w-full text-left p-1 hover:bg-[#010D3E] hover:text-white cursor-pointer"  onClick={() => handleStatusUpdate(status)}  disabled={loading}> {loading ? "Updating..." : status}</button>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 items-center cursor-pointer link-animate" onClick={toggleDropdown}>
                  <span>Update Status</span>
                  <FaCaretDown />
                </div>
              </div>
              <div className="flex gap-3 items-center cursor-pointer link-animate " onClick={visitProfile} >
                <span>Visit Profile</span>
               <FaArrowRight className="icon-animate" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicantsCard;

const DetailsCard = ({ title, details,href = null,match=false}: { title: string; details: string | number; href?: string | null; match?:boolean}) => (
  <span className={`font-semibold ${match && "text-[#001E80]"}`}> {title}{" "}
    {href ? (
      <a  className="font-bold text-[#001E80] underline underline-offset-2 " href={href as string} target="_blank" rel="noopener noreferrer" >  {details}</a>
    ) : (
      <span className={`font-normal ${match && "text-[#001E80]"} font-semibold`}>{details}</span>
    )}
  </span>
);
