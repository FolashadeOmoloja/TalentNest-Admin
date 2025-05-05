import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
type analytics = {
  analtyticsTitle: string;
  stats: number;
  desc: string;
  link: string;
  linkName: string;
}[];
const StatsCard = ({ analytics }: { analytics: analytics }) => {
  return (
    <section className="mt-8  grid grid-cols-1 slg:grid-cols-2 gap-8">
      {analytics.map((item, idx) => (
        <div
          className={`col-span-1 ${
            idx === 0 ? "bg-[#010D3E] text-white" : "border border-[#E0E1E6] "
          } h-[240px] w-full rounded-md py-7  pl-9 flex flex-col gap-4`}
          key={idx}
        >
          <span className="font-bold text-lg ">{item.analtyticsTitle}</span>
          <span className="text-5xl font-bold ">{item.stats}</span>
          <span
            className={`${
              idx === 0 ? "text-white" : "text-[#7C8698]"
            } font-semibold`}
          >
            {item.desc}
          </span>
          <Link
            href={item.link}
            className={`flex items-center gap-2 ${
              idx === 0 ? "text-white" : "text-[#010D3E]"
            }  text-sm font-semibold link-animate`}
          >
            <span>{item.linkName}</span>
            <FaArrowRight className="icon-animate" />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default StatsCard;
