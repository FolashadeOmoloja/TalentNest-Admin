import { JobPosted, MeetingType, userObject } from "@/utilities/typeDefs";
import ModalContainer from "../Elements/ModalContainer";
import { Cancel } from "../Elements/ApplicantCardElements";
import { useDispatch, useSelector } from "react-redux";
import { setTalent } from "@/redux/slices/talentSlice";
import { setJob } from "@/redux/slices/jobSlice";
import { handleDeleteSchedule } from "@/hooks/schedule-meeting-hook";
import { useEffect } from "react";
import { setMeetingId } from "@/redux/slices/scheduledMeetingSlice";

const PreviewScheduleModal = ({
  open,
  setOpen,
  meetingSch = [],
  setModalDisplay,
  setShowRescheduleModal,
  selectedDateStr,
  setMeetingSch,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalDisplay: React.Dispatch<React.SetStateAction<string>>;
  setShowRescheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
  meetingSch: MeetingType[];
  selectedDateStr: string;
  setMeetingSch: React.Dispatch<
    React.SetStateAction<MeetingType[] | undefined>
  >;
}) => {
  const { allTalents } = useSelector((store: any) => store.talent);
  const { allJobs } = useSelector((store: any) => store.job);
  const { scheduledMeeting } = useSelector(
    (store: any) => store.scheduledMeeting
  );
  const { onDelete } = handleDeleteSchedule();
  const dispatch = useDispatch();
  const handleRemove = async (meetingId: string) => {
    await onDelete(meetingId);
  };

  useEffect(() => {
    console.log("useEffect updating");
    const meetingsForDay = scheduledMeeting.filter(
      (meeting: any) =>
        new Date(meeting.date).toDateString() === selectedDateStr
    );
    setMeetingSch(meetingsForDay);
  }, [scheduledMeeting]);

  const handleReschedule = (id: string, meetingId: string, jobId?: string) => {
    const talentDet = allTalents.find(
      (talent: userObject) => talent._id === id
    );
    const jobDet = allJobs.find((job: JobPosted) => job._id === jobId);
    dispatch(setJob(jobDet));
    dispatch(setTalent(talentDet));
    dispatch(setMeetingId(meetingId));
    setOpen(false);
    setModalDisplay("reschedule");
    setShowRescheduleModal(true);
  };

  return (
    <ModalContainer
      btnCta={""}
      btnWidthStyles=" h-0 w-0 pointer-events-none"
      dialogClassName="sm:max-w-lg duration-300 ease-in"
      color=""
      handleOpen={() => {}}
      open={open}
      handleClose={() => {}}
      background="bg-transparent"
    >
      <div className="relative  w-full max-w-xl mx-auto ">
        <div className="flex justify-between mb-6">
          <p className="text-xl font-bold  bg-text">Scheduled Meetings</p>
          <Cancel handleClose={() => setOpen(false)} />
        </div>

        {meetingSch.length === 0 ? (
          <p className="text-gray-600">No meetings scheduled for this day.</p>
        ) : (
          <ul className="space-y-4 w-full">
            {meetingSch.map((meeting, idx) => (
              <li key={idx} className="bg-[#EAEEFE] p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Name: {meeting.recipientName}
                </p>
                <p className="text-sm">Email: {meeting.recipientEmail}</p>
                <p className="text-sm">Time: {meeting.time}</p>
                <p className="text-sm">Job: {meeting.jobTitle}</p>
                <p className="text-sm">Company: {meeting.company}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md text-sm "
                    onClick={() => handleRemove(meeting._id as string)}
                  >
                    Remove
                  </button>
                  <button
                    className="px-3 py-2 bg-[#001E80] hover:bg-[#001E80]/95  transition   text-white rounded-md text-sm "
                    onClick={() =>
                      handleReschedule(
                        meeting.applicantId
                          ? meeting.applicantId
                          : (meeting.companyId as string),
                        meeting._id as string,
                        meeting.jobId ? meeting.jobId : ""
                      )
                    }
                  >
                    Reschedule
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalContainer>
  );
};

export default PreviewScheduleModal;
