import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CustomDatePicker = ({
  selectedDate,
  handleSelect,
}: {
  selectedDate: Date | undefined;
  handleSelect: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Define currentMonth state
  const [currentTime, setCurrentTime] = useState("");

  //update time from west africa

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // optional: use 24-hour format if preferred
      };
      const time = new Intl.DateTimeFormat("en-NG", options).format(date);
      setCurrentTime(time);
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // clean up
  }, []);

  const handleMonthChange = (month: any) => {
    setCurrentMonth(month);
  };

  return (
    <div className="relative">
      <div className="bg-white w-full z-50">
        <h2 className="text-lg font-bold mb-3 text-[#001E80]">
          Select a Date & Time
        </h2>

        {/* Custom Navigation */}
        <div className="flex items-center justify-center gap-6  my-4">
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
          required={true}
          selected={selectedDate}
          onSelect={handleSelect}
          month={currentMonth}
          onMonthChange={handleMonthChange} // Handles month switching
          classNames={{
            caption: "hidden",
            day_selected: "border-none text-white rounded-full",
            nav_button: "hidden",
          }}
        />
        <p className="mt-5 sm:mt-6 font-semibold text-sm">
          Time zone set to West Africa Time ({currentTime})
        </p>
      </div>
    </div>
  );
};

export default CustomDatePicker;
