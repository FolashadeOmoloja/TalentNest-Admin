import { useSelector } from "react-redux";
import CustomDatePicker from "./DatePicker";

const PickerandTime = ({
  selectedDate,
  openSetTime,
  handleSelect,
  timeArr,
  time,
  setTime,
  setShowDetails,
}: {
  selectedDate: Date | undefined;
  handleSelect: (date: Date) => void;
  openSetTime: boolean;
  timeArr: string[];
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";
  const { scheduledMeeting } = useSelector(
    (store: any) => store.scheduledMeeting
  );

  const takenTimes =
    selectedDate && scheduledMeeting
      ? scheduledMeeting
          .filter(
            (s: any) => new Date(s.date).getTime() === selectedDate.getTime()
          ) // same date
          .map((s: any) => s.time) // extract times taken that day
      : [];

  return (
    <div
      className={`mt-3 text-center sm:mt-5 transition-all duration-300 flex max-md:flex-col gap-6 ${
        openSetTime ? "justify-between" : "justify-center"
      }`}
    >
      <CustomDatePicker
        selectedDate={selectedDate}
        handleSelect={handleSelect}
      />
      {openSetTime && (
        <div className="sm:h-[290px]">
          <p className="mb-5 text-sm">{formattedDate}</p>
          <div className="flex flex-col gap-2 sm:overflow-y-scroll sm:h-full">
            {timeArr.map((item, idx) => {
              const isTaken = takenTimes.includes(item);
              const dateSelected = selectedDate as Date;

              const slotDateTime = new Date(dateSelected);
              const [hours, minutes] = item.split(":"); // Split "15:00" into [15, 00]
              slotDateTime.setHours(Number(hours));
              slotDateTime.setMinutes(Number(minutes));
              slotDateTime.setSeconds(0);
              slotDateTime.setMilliseconds(0);
              const isToday =
                dateSelected.toDateString() === new Date().toDateString();
              const isInPastDay =
                dateSelected < new Date(new Date().setHours(0, 0, 0, 0));
              const isPastTimeToday =
                isToday && slotDateTime.getTime() <= new Date().getTime();

              // Mark unavailable if:
              // - time is taken
              // - OR the whole selected day is in the past
              // - OR today and the time has passed
              const isUnavailable = isTaken || isInPastDay || isPastTimeToday;

              const isSelected = item === time;

              return (
                <div
                  key={idx}
                  className={`w-full sm:w-[150px] flex items-center transition-all duration-300 ease-in-out ${
                    isUnavailable ? "opacity-40 pointer-events-none" : ""
                  }`}
                >
                  <div className="w-full relative">
                    <div
                      className={`absolute inset-0 flex gap-2 text-white transition-opacity duration-200 ease-in-out ${
                        isSelected
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <span className="bg-slate-600 selected-time">{item}</span>
                      <span
                        className="bg-[#010D3E] selected-time"
                        onClick={() => setShowDetails(true)}
                      >
                        Next
                      </span>
                    </div>

                    <span
                      className={`block time-span transition-opacity duration-200 ease-in-out ${
                        isSelected
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100 cursor-pointer"
                      }`}
                      onClick={() => !isUnavailable && setTime(item)}
                    >
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PickerandTime;
