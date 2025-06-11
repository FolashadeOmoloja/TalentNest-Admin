"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import CTABTN from "../CTA-Button";
import PickerandTime from "./PickerandTime";
import MeetingConfirmationCard from "./MeetingConfirmationCard";
import { useSelector } from "react-redux";
import { handleCreateSchedule } from "@/hooks/schedule-meeting-hook";

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
    setSelectedDate(undefined);
    setTime("");
    setOpenSetTime(false);
    setShowDetails(false);
    setOpen(false);
  };

  return (
    <div>
      <CTABTN
        route={""}
        isFunc
        func={handleOpen}
        CTA={
          scheduled
            ? "Reschedule"
            : talentBool
            ? "Schedule Interview"
            : "Schedule Meeting"
        }
        backGround="bg-[#001E80]"
        width="w-[180px] hover:bg-[#001E80]/95 transition ease-in text-sm font-semibold"
        height2="h-[40px] text-sm"
      />
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-[200] transition-all duration-300 ease-in"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className={`relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8  sm:p-6 sm:w-full ${
                openSetTime
                  ? "sm:max-w-xl duration-300 ease-out"
                  : "sm:max-w-lg duration-300 ease-in"
              }   data-closed:sm:translate-y-0 data-closed:sm:scale-95`}
            >
              <main>
                <div className={`w-full flex mb-5 justify-between`}>
                  {showDetails && <GoBack setChange={setShowDetails} />}
                  <Cancel setChange={setOpen} />
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

interface IconProps {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoBack = ({ setChange }: IconProps) => (
  <div
    onClick={() => setChange(false)}
    className="cursor-pointer hover:bg-[#f3f6fc] rounded-full transition duration-200"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="17.5"
        className="fill-white group-hover:fill-[#001e800e] transition-all"
      />
      <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#EFEFEF" />
      <path
        d="M24.5625 18.6429L11.4375 18.6429M11.4375 18.6429L17.0625 24.2679M11.4375 18.6429L17.0625 13.0179"
        stroke="#001E80"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Cancel = ({ setChange }: IconProps) => (
  <div
    onClick={() => setChange(false)}
    className="cursor-pointer hover:bg-[#f3f6fc] rounded-full transition duration-200"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="17.5"
        className="fill-white group-hover:fill-[#001e800e] transition-all"
      />
      <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#EFEFEF" />
      <path
        d="M23.625 24.2679L12.375 13.0179M23.625 13.0179L12.375 24.2679"
        stroke="#001E80"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
