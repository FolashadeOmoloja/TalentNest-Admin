import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight, InfoIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSchedules } from "@/hooks/schedule-meeting-hook";
import PreviewScheduleModal from "./PreviewSheduleModal";
import { MeetingType } from "@/utilities/typeDefs";
import ScheduleModal from "../Elements/Schedule/Modal";

const SchedulePreview = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { schedules } = useGetSchedules();
  const [openModal, setOpenModal] = useState(false);
  const [modalDisplay, setModalDisplay] = useState("preview");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [daySelected, setDaySelected] = useState("");
  const [highlightedDates, setHighlightedDates] = useState<Set<string>>(
    new Set()
  );
  const [meetingSch, setMeetingSch] = useState<MeetingType[]>();
  const { scheduledMeeting } = useSelector(
    (store: any) => store.scheduledMeeting
  );

  useEffect(() => {
    const newDates = new Set<string>(
      scheduledMeeting?.map((meeting: any) =>
        new Date(meeting.date).toDateString()
      )
    );
    setHighlightedDates(newDates);
  }, [scheduledMeeting]);

  const handleMonthChange = (month: any) => {
    setCurrentMonth(month);
  };

  return (
    <div className="relative bg-[#EAEEFE] max-xsm:bg-white w-full rounded-md max-lsm:overflow-x-scroll">
      <div className=" w-full xsm:p-4 ">
        {/* Custom Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
              )
            }
            className=" disabled:opacity-30"
          >
            <ChevronLeft size={20} className="text-[#0C0D00]" />
          </button>
          <span className="text-sm font-bold text-[#0C0D00]">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
              )
            }
            className=" disabled:opacity-30"
          >
            <ChevronRight size={20} className="text-[#0C0D00]" />
          </button>
        </div>

        {/* DayPicker */}
        <DayPicker
          mode="single"
          disabled={(date) => !highlightedDates.has(date.toDateString())}
          modifiers={{
            scheduled: (date) => highlightedDates.has(date.toDateString()),
          }}
          modifiersClassNames={{
            scheduled: "bg-[#001E80] rounded-full text-white scheduled-days",
          }}
          onSelect={(selectedDay) => {
            if (!selectedDay) return;

            const selectedDateStr = selectedDay.toDateString();
            setDaySelected(selectedDateStr);
            const meetingsForDay = scheduledMeeting.filter(
              (meeting: any) =>
                new Date(meeting.date).toDateString() === selectedDateStr
            );
            setMeetingSch(meetingsForDay);
            setOpenModal(true);
            console.log("Meetings for", selectedDateStr, meetingsForDay);
          }}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          classNames={{
            caption: "hidden",
            nav_button: "hidden",
            day: "pointer-events-none",
            day_selected: "",
            day_disabled: "text-gray-800",
          }}
        />
        {modalDisplay === "preview" ? (
          <PreviewScheduleModal
            open={openModal}
            setOpen={setOpenModal}
            meetingSch={meetingSch as MeetingType[]}
            setModalDisplay={setModalDisplay}
            setShowRescheduleModal={setShowRescheduleModal}
            selectedDateStr={daySelected}
            setMeetingSch={setMeetingSch}
          />
        ) : modalDisplay === "reschedule" ? (
          <ScheduleModal
            func={() => {}}
            preview={showRescheduleModal}
            setModalDisplay={setModalDisplay}
            scheduled
          />
        ) : null}
      </div>
    </div>
  );
};

export default SchedulePreview;
