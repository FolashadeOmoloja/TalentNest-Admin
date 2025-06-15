import { updateApplicationStatus } from "@/hooks/application-hook";
import { Applicants } from "@/utilities/typeDefs";
import { useState } from "react";
import { FaArrowRight, FaCaretDown } from "react-icons/fa6";
import ConfirmationModal from "./HireOrDecline/ConfirmationModal";

const DetailsCard = ({
  title,
  details,
  href = null,
  match = false,
}: {
  title: string;
  details: string | number;
  href?: string | null;
  match?: boolean;
}) => (
  <span className={`font-semibold ${match && "text-[#001E80]"}`}>
    {" "}
    {title}{" "}
    {href ? (
      <a
        className="font-bold text-[#001E80] underline underline-offset-2 "
        href={href as string}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        {details}
      </a>
    ) : (
      <span
        className={`font-normal ${match && "text-[#001E80]"} font-semibold`}
      >
        {details}
      </span>
    )}
  </span>
);

export default DetailsCard;

export const ChangeStatusDropdown = ({ item }: { item: Applicants }) => {
  const statuses = ["Hired", "Declined"];
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { loading, handleUpdate } = updateApplicationStatus();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleStatusUpdate = (status: string) => {
    setDropdownVisible(false);
    handleUpdate(status, item._id, item.job);
  };
  return (
    <div className="relative">
      {isDropdownVisible && (
        <div className="absolute top-[-120px] text-black text-sm left-0 bg-white shadow-lg  z-10 border rounded-md xxsm:w-[180px]">
          {statuses.map((status) => (
            // <button
            //   key={status}
            //   className=""
            //   onClick={() => handleStatusUpdate(status)}
            //   disabled={loading}
            // >
            //   {" "}
            //   {loading ? "Updating..." : status}
            // </button>
            <ConfirmationModal
              hire={status === "Hired"}
              key={status}
              talentDets={item}
            />
          ))}
        </div>
      )}
      <div
        className="flex gap-3 items-center cursor-pointer link-animate"
        onClick={toggleDropdown}
      >
        <span>Update Status</span>
        <FaCaretDown className="max-sm:hidden" />
      </div>
    </div>
  );
};

export const VisitProfileBtn = ({
  visitProfile,
}: {
  visitProfile: () => void;
}) => {
  return (
    <div
      className="flex gap-3 items-center cursor-pointer link-animate "
      onClick={visitProfile}
    >
      <span>Visit Profile</span>
      <FaArrowRight className="icon-animate" />
    </div>
  );
};

export const GoBack = ({
  setChange,
}: {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
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

export const Cancel = ({ handleClose }: { handleClose?: () => void }) => (
  <div
    onClick={handleClose}
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
