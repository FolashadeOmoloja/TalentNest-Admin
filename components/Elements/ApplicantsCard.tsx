import { setTalent } from "@/redux/slices/talentSlice";
import { Applicants } from "@/utilities/typeDefs";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ScheduleModal from "./Schedule/Modal";
import DetailsCard, {
  ChangeStatusDropdown,
  VisitProfileBtn,
} from "./ApplicantCardElements";
import ViewNotes from "./HireOrDecline/ViewNotes";

const ApplicantsCard = ({
  item,
  isUnderReview = true,
  interview = false,
}: {
  item: Applicants;
  isUnderReview?: boolean;
  interview?: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const encodedId = btoa(item?.talent._id as string);
  const changeAppl = () => {
    dispatch(setTalent(item?.talent));
  };
  const visitProfile = () => {
    changeAppl();
    router.push(`/control-room/manage-talents/${encodedId}`);
  };
  const { scheduledMeeting } = useSelector(
    (store: any) => store.scheduledMeeting
  );
  let meetingDate = "";
  let meetingTime = "";
  scheduledMeeting.forEach((meeting: any) => {
    if (meeting.applicantId === item?.talent._id) {
      const dateObj = new Date(meeting.date);

      // Format the meeting date to a readable string
      meetingDate = dateObj.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      meetingTime = meeting.time;
    }
  });

  return (
    <section className="py-6">
      <div className="rounded-lg w-full p-5 max-xsm:p-3 border-[#001E80] border-2">
        <div className=" flex justify-between max-sm:flex-col max-sm:gap-5 max-sm:items-center max-sm:text-center">
          <div className="text-sm flex flex-col basis-1/2 justify-between max-sm:gap-3">
            <div className="w-[200px] h-[200px]  rounded-lg max-sm:mx-auto">
              {item.talent.profileImage ? (
                <img
                  src={item.talent.profileImage}
                  className="object-center object-cover w-full h-full rounded-lg"
                />
              ) : (
                <section
                  className={`w-[200px] h-[200px]  text-5xl text-white  font-bold centered bg-[#010D3E]  rounded-lg`}
                >
                  {" "}
                  {item.talent.firstName[0]}{" "}
                </section>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">
                Name: {item.talent.firstName} {item.talent.lastName}
              </p>
              <p className="font-semibold">
                Profession: {item.talent.profession}, ({item.talent.industry})
              </p>
            </div>
          </div>
          <div className="text-sm basis-1/2 flex flex-col gap-3">
            <span className="font-bold text-[16px] text-[#001E80]">
              Talents Details
            </span>
            <DetailsCard title="Email:" details={item.talent.emailAddress} />
            <DetailsCard
              title="LinkedIn Url:"
              details={item.talent.linkedInUrl}
              href={item.talent.linkedInUrl}
            />
            <DetailsCard
              title="Years of Experience:"
              details={item.talent.experienceYears}
            />
            <DetailsCard
              title="Level of Experience:"
              details={item.talent.experienceLevel}
            />
            <DetailsCard
              title="Location:"
              details={`${item.talent.location} ${item.talent.country}`}
            />
            <DetailsCard
              title="Skills:"
              details={item.talent.skills.join(", ")}
            />
            <DetailsCard
              title="Resume:"
              details={item.talent.resumeOriginalName}
              href={item?.talent.resume}
            />
            {isUnderReview && (
              <DetailsCard title="Application status:" details={item.status} />
            )}
            {isUnderReview === false && (
              <DetailsCard
                title="Match Percentage:"
                match
                details={`${(item.score * 100).toFixed(2)}%`}
              />
            )}
            {isUnderReview === false && interview && (
              <DetailsCard
                title="Scheduled Interview:"
                match
                details={`${meetingDate}, ${meetingTime} (WAT)`}
              />
            )}
          </div>
        </div>
        {/*update status and visit profile for scheduling */}
        {isUnderReview === false && (
          <div className="mt-5">
            <div className="p-3 text-[#001E80] flex justify-between bg-white rounded-lg font-bold items-center text-sm transition duration-300 max-md:flex-col max-md:gap-3">
              {interview && <ChangeStatusDropdown item={item} />}
              <VisitProfileBtn visitProfile={visitProfile} />
              <ViewNotes
                notes={
                  item.feedback ? item.feedback : "Not available at the moment"
                }
              />
              <ScheduleModal func={changeAppl} scheduled={interview} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicantsCard;
