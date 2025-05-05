import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const DashCards = ({
  title,
  link,
  linkName,
}: {
  title: string;
  link: string;
  linkName: string;
}) => {
  return (
    <div
      className={`bg-white rounded-md flex flex-col w-full h-[100px]  pl-7 pr-4 pt-6 gap-2`}
    >
      <span className="text-lg font-semibold  ">{title}</span>
      <Link
        href={link}
        className="flex items-center gap-2 text-[#010D3E] text-sm font-semibold"
      >
        <span>{linkName}</span>
        <FaArrowRight className="icon-animate" />
      </Link>
    </div>
  );
};

export default DashCards;
