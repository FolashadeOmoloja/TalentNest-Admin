import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
type analytics = {
  analtyticsTitle: string;
  stats: number;
  desc: string | JSX.Element;
}[];
type chartData = { name: string; jobs: number; talents: number }[];
const DashboardLayout = ({
  chartData,
  analytics,
  stat1,
  stat2,
  stat3,
  stat4,
}: {
  chartData: chartData;
  analytics: analytics;
  stat1: string;
  stat2: string;
  stat3: string;
  stat4: string;
}) => {
  return (
    <section className="dashboard-container flex  gap-10 flex-col">
      <div>
        <h1 className="text-2xl font-bold bg-text">
          Welcome back, <span className="text-[#001E80]">Admin!</span>{" "}
        </h1>
        <p className="text-gray-700 text-sm font-medium">
          Here's an overview of platform activities and statistics.
        </p>
      </div>
      <section className=" flex  lg:gap-10 gap-4 flex-col">
        <aside className="grid grid-cols-4 max-slg:grid-cols-3 max-md:grid-cols-2 max-smd:grid-cols-1  gap-7">
          {analytics.map((item, idx) => (
            <div
              key={`${item.analtyticsTitle}-${idx}`}
              className="rounded-2xl shadow-md p-4 bg-white flex justify-between items-center"
            >
              <span className="text-[#001E80] text-3xl max-xsm:text-xl">
                {" "}
                {item.desc}
              </span>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2 max-xsm:text-xs">
                  {item.analtyticsTitle}
                </p>
                <h2 className="text-2xl font-bold max-xsm:text-xl">
                  {item.stats}
                </h2>
              </div>
            </div>
          ))}
        </aside>
        <BarChat chartData={chartData} />
        <div className="grid md:grid-cols-2  gap-4">
          <StatsCard
            title={"Manage Jobs"}
            desc={"View and manage active job listings and applications"}
            link={"/control-room/manage-jobs"}
            linkName="Go to jobs"
            stats={stat1}
          />
          <StatsCard
            title={"Manage Talents"}
            desc={"Review and shortlist registered talents"}
            link={"/control-room/manage-talents"}
            linkName="Go to talents"
            stats={stat2}
          />
          <StatsCard
            title={"Manage Companies"}
            desc={"Keep track of registered companies and their activities"}
            link={"/control-room/manage-companies"}
            linkName="Go to companies"
            stats={stat3}
          />
          <StatsCard
            title={"Employed Talents"}
            desc={"View successful hires and their details"}
            link={"/control-room/successful-hires"}
            linkName="Go to hires"
            stats={stat4}
          />
          <StatsCard
            title={"Blog Posts"}
            desc={"Manage and create blog posts for the platform"}
            link={"/control-room/manage-reviews"}
            linkName="Go to blogs"
          />
          <StatsCard
            title={"Reviews"}
            desc={"Moderate talent and job reviews"}
            link={"/control-room/manage-reviews"}
            linkName="Go to reviews"
          />
          <StatsCard
            title={"FAQs"}
            desc={"Edit or add FAQs for users"}
            link={"/control-room/manage-faqs"}
            linkName="Go to faqs"
          />
          <StatsCard
            title={"Filters"}
            desc={"Manage TalentNest filters/dropdowns"}
            link={"/control-room/manage-filters"}
            linkName="Go to Filters"
          />
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;

const StatsCard = ({
  title,
  desc,
  link,
  linkName,
  stats,
}: {
  title: string;
  desc: string;
  link: string;
  linkName: string;
  stats?: string;
}) => {
  return (
    <div className="rounded-2xl shadow-md bg-white cursor-pointer p-6 border-[0.1px] border-gray-300">
      <h2 className="text-xl bg-text font-semibold mb-4">{title}</h2>
      <div className="mb-3">
        <p className="text-gray-500">{desc}</p>
        <p className="text-[#010D3E] italic text-sm">{stats}</p>
      </div>
      <Link
        href={link}
        className="flex items-center gap-2 text-[#010D3E] text-sm font-semibold link-animate"
      >
        <span>{linkName}</span>
        <FaArrowRight className="icon-animate " />
      </Link>
    </div>
  );
};

const BarChat = ({ chartData }: { chartData: chartData }) => {
  return (
    <div className="bg-white p-4 max-sm:px-0 rounded-2xl shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 max-sm:ml-4  bg-text">
        Monthly Activities
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jobs" fill="#001E80" name="Jobs" />
          <Bar dataKey="talents" fill="#010D3E" name="Talents" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
