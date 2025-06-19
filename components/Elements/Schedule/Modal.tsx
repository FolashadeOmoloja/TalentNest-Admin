"use client";
import { useState } from "react";
import PickerandTime from "./PickerandTime";
import MeetingConfirmationCard from "./MeetingConfirmationCard";
import { useSelector } from "react-redux";
import {
  handleCreateSchedule,
  handleUpdateSchedule,
  useCreateCompanySchedule,
} from "@/hooks/schedule-meeting-hook";
import { Cancel, GoBack } from "../ApplicantCardElements";
import ModalContainer from "../ModalContainer";

export default function ScheduleModal({
  talentBool = true,
  scheduled = false,
  func,
  preview,
  setModalDisplay,
  text = "text-sm",
}: {
  talentBool?: boolean;
  scheduled?: boolean;
  func: () => void | ((id: string) => void);
  preview?: boolean;
  setModalDisplay?: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
}) {
  const [open, setOpen] = useState(preview ? preview : false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [openSetTime, setOpenSetTime] = useState(false);
  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const { talent } = useSelector((store: any) => store.talent);
  const { job } = useSelector((store: any) => store.job);
  const { company } = useSelector((store: any) => store.company);
  const { onSubmit, loading } = handleCreateSchedule();
  const { onCreate } = useCreateCompanySchedule();
  const { user } = useSelector((store: any) => store.auth);
  const { meetingId } = useSelector((store: any) => store.scheduledMeeting);
  const { onUpdate } = handleUpdateSchedule();
  const handleSelect = (date: Date) => {
    if (!date) return "";
    setSelectedDate(date);
    setOpenSetTime(true);
  };
  const timeArr = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const handleOpen = () => {
    setOpen(true);
    func();
  };

  const handleClose = () => {
    setOpen(false);
    if (setModalDisplay) {
      setModalDisplay("preview");
    }
    setTimeout(() => {
      setSelectedDate(undefined);
      setTime("");
      setOpenSetTime(false);
      setShowDetails(false);
    }, 300);
  };

  const createSchedule = async () => {
    if (talentBool) {
      const data = {
        recipientName: `${talent.firstName}`,
        recipientEmail: talent.emailAddress,
        createdBy: user._id,
        date: selectedDate ? selectedDate.toString() : "",
        time: time,
        meetingUrl: meetingLink,
        jobTitle: job.role,
        company: job.company.companyName,
        applicantId: talent._id,
        jobId: job._id,
      };
      if (scheduled) {
        await onUpdate(data, meetingId);
      } else {
        await onSubmit(data);
      }
    } else {
      const data = {
        recipientName: `${company.firstName}`,
        recipientEmail: company.emailAddress,
        createdBy: user._id,
        date: selectedDate ? selectedDate.toString() : "",
        time: time,
        meetingUrl: meetingLink,
        company: company.companyName,
        companyId: company._id,
      };
      onCreate(data);
    }

    handleClose();
  };

  return (
    <ModalContainer
      btnCta={
        scheduled
          ? "Reschedule"
          : talentBool
          ? "Schedule Interview"
          : "Schedule Meeting"
      }
      btnWidthStyles={
        preview != undefined
          ? "w-0 h-0 text-[0px] opacity-0 pointer-events-none"
          : `${
              talentBool
                ? "w-[180px] hover:bg-[#001E80]/95"
                : "h-[56px] bg-[#010D3E] hover:bg-[#010D3E]/95 px-6 mt-6 "
            }  transition ease-in  font-semibold`
      }
      dialogClassName={
        openSetTime
          ? "sm:max-w-xl duration-300 ease-out"
          : "sm:max-w-lg duration-300 ease-in"
      }
      handleOpen={handleOpen}
      open={open}
      handleClose={handleClose}
      text={text}
    >
      <main>
        <div className={`w-full flex mb-5 justify-between`}>
          {showDetails && <GoBack setChange={setShowDetails} />}
          <Cancel handleClose={handleClose} />
        </div>
        {showDetails ? (
          <MeetingConfirmationCard
            func={createSchedule}
            setMeetingLink={setMeetingLink}
            meetingLink={meetingLink}
            time={time}
            recipent={talentBool ? talent : company}
            company={!talentBool}
            loading={loading}
            date={
              selectedDate
                ? selectedDate.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : ""
            }
          />
        ) : (
          <PickerandTime
            selectedDate={selectedDate}
            handleSelect={handleSelect}
            openSetTime={openSetTime}
            timeArr={timeArr}
            time={time}
            setTime={setTime}
            setShowDetails={setShowDetails}
          />
        )}
      </main>
    </ModalContainer>
  );
}
