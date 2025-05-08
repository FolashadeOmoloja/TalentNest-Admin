import { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

const ProfileBox = ({ title, details }: { title: string; details: string }) => {
  return (
    <div className="flex w-full border-b border-gray-200 py-5 max-sm:h-[89px] gap-4 max-slg:flex-col">
      <span className="text-[#1B2C42] font-semibold basis-[30%]">{title}</span>
      <span className="text-gray-500 basis-[70%]">{details}</span>
    </div>
  );
};

export default ProfileBox;

export const DownloadResumeBox = ({
  title,
  filename,
}: {
  title: string;
  filename: string;
}) => {
  return (
    <div className="flex w-full border-b border-gray-200 py-5 max-sm:h-[120px] gap-4 slg:items-center max-slg:flex-col">
      <span className="text-[#1B2C42] font-semibold basis-[30%]">{title}</span>
      <a
        href={filename.replace("/raw/", "/auto/")}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#010D3E] text-white rounded-md font-semibold btn-hover flex gap-1 items-center max-w-[200px]"
      >
        <MdOutlineFileDownload />
        View Resume
      </a>
    </div>
  );
};

//combin with the top instead
export const DownloadResumeBotton = ({ filename }: { filename: string }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    const link = linkRef.current;
    if (link) {
      link.href = filename;
      link.click();
    }
  };
  return (
    <div className="">
      <a
        ref={linkRef}
        style={{ display: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        hidden download link
      </a>
      <button
        onClick={handleDownload}
        className="px-4 h-[50px] text-sm bg-[#010D3E] text-white rounded-md font-semibold flex gap-1 items-center max-w-[200px]"
      >
        <MdOutlineFileDownload />
        Download <span className="max-slg:hidden">Resume</span>
      </button>
    </div>
  );
};
