import { updateApplicationStatus } from "@/hooks/application-hook";
import { Applicants } from "@/utilities/typeDefs";
import { useState } from "react";
import { FaArrowRight, FaCaretDown } from "react-icons/fa6";

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
        <div className="absolute top-[-150px] text-black text-sm left-0 bg-white shadow-lg p-3  z-10 border rounded-md xxsm:w-[180px]">
          {statuses.map((status) => (
            <button
              key={status}
              className="block w-full text-left p-1 hover:bg-[#010D3E] hover:text-white cursor-pointer"
              onClick={() => handleStatusUpdate(status)}
              disabled={loading}
            >
              {" "}
              {loading ? "Updating..." : status}
            </button>
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
