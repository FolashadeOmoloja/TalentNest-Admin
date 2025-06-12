"use client";
import { useEffect, useState } from "react";
import PickerandTime from "./PickerandTime";
import MeetingConfirmationCard from "./MeetingConfirmationCard";
import { useSelector } from "react-redux";
import { handleCreateSchedule } from "@/hooks/schedule-meeting-hook";
import { Cancel, GoBack } from "../ApplicantCardElements";
import ModalContainer from "../ModalContainer";

export default function ScheduleModal({
  talentBool = true,
  scheduled = false,
  func,
}: {
  talentBool?: boolean;
  scheduled?: boolean;
  func: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [openSetTime, setOpenSetTime] = useState(false);
  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const { talent } = useSelector((store: any) => store.talent);
  const { job } = useSelector((store: any) => store.job);
  const { onSubmit, loading } = handleCreateSchedule();
  const { user } = useSelector((store: any) => store.auth);
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
    setTimeout(() => {
      setSelectedDate(undefined);
      setTime("");
      setOpenSetTime(false);
      setShowDetails(false);
    }, 300);
  };

  const createSchedule = async () => {
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

    await onSubmit(data);
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
      btnWidthStyles="w-[180px] hover:bg-[#001E80]/95 transition ease-in text-sm font-semibold"
      dialogClassName={
        openSetTime
          ? "sm:max-w-xl duration-300 ease-out"
          : "sm:max-w-lg duration-300 ease-in"
      }
      handleOpen={handleOpen}
      open={open}
      handleClose={handleClose}
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
            recipent={talent}
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
