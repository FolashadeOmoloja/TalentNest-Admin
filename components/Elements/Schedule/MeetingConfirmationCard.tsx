import { userCompanyObject, userObject } from "@/utilities/typeDefs";
import { CalendarDays, Clock, Globe, Video } from "lucide-react";
import CTABTN from "../CTA-Button";

interface Props {
  date: string;
  time: string;
  recipent?: userObject | userCompanyObject;
  meetingLink: string;
  setMeetingLink: React.Dispatch<React.SetStateAction<string>>;
  func: () => void;
  loading: boolean;
  company: boolean;
}

export default function MeetingConfirmationCard({
  date,
  time,
  meetingLink,
  setMeetingLink,
  recipent,
  func,
  loading,
  company,
}: Props) {
  const divClass = "flex items-center gap-3 mb-4 text-gray-700 text-sm";

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">
        {company
          ? `Meeting with ${(recipent as userCompanyObject)?.companyName}`
          : `Meeting with ${recipent?.firstName} ${recipent?.lastName}`}
      </h2>

      <div className={divClass}>
        <Clock className="w-5 h-5" />
        <span>30 mins</span>
      </div>

      <div className={divClass}>
        <Video className="w-5 h-5" />
        <span>Web conferencing details provided upon confirmation.</span>
      </div>

      <div className={divClass}>
        <CalendarDays className="w-5 h-5" />
        <span>
          {time}, {date}
        </span>
      </div>

      <div className={divClass}>
        <Globe className="w-5 h-5" />
        <span>West Africa Time</span>
      </div>

      <div className="flex formdivs flex-col  gap-2">
        <label className="text-gray-700">
          Meeting Link (Google Meet or Zoom)
          <span className="text-red-600 text-base">*</span>
        </label>
        <input
          type="url"
          placeholder="Paste Google Meet / Zoom link here"
          className="w-full p-2 border rounded mb-2"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
        />

        <div className="mt-5 ">
          <CTABTN
            route={""}
            isFunc
            func={func}
            CTA={"Schedule Meeting"}
            backGround="border-2 border-[#001E80]"
            color="text-[#001E80]"
            width="px-3 hover:bg-[#001E80]/95 hover:text-white transition ease-in text-sm font-semibold"
            height2="h-[40px] text-sm"
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
