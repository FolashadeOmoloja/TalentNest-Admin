import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Top Stats Cards */}
      <div className="xl:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Job Offers" value="1" />
        <StatCard title="Named Talents" value="11" />
        <StatCard title="Named Companies" value="3" />
        <StatCard title="Employed Talents" value="2" />
      </div>

      {/* Monthly Activities + Calendar */}
      <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Activities</h2>
          <div className="h-[300px] bg-slate-100 rounded-md flex items-center justify-center">
            Chart Component
          </div>
        </div>

        {/* Small Calendar Preview */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-md font-semibold mb-4">Interview Dates</h2>
          {/* Calendar Placeholder */}
          <div className="h-[280px] bg-slate-100 rounded-md flex items-center justify-center">
            Small Calendar Here
          </div>
        </div>
      </div>

      {/* Quick Access Panels */}
      <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickAccessCard
          title="Manage Jobs"
          link="/admin/jobs"
          desc="View and manage jobs"
        />
        <QuickAccessCard
          title="Manage Talents"
          link="/admin/talents"
          desc="Evaluate talents"
        />
        <QuickAccessCard
          title="Manage Companies"
          link="/admin/companies"
          desc="Company overview"
        />
        <QuickAccessCard
          title="Employed Talents"
          link="/admin/employed"
          desc="View successful hires"
        />
        <QuickAccessCard
          title="Blog Posts"
          link="/admin/blog"
          desc="Manage blog"
        />
        <QuickAccessCard
          title="Reviews"
          link="/admin/reviews"
          desc="Moderate job reviews"
        />
        <QuickAccessCard
          title="FAQs"
          link="/admin/faqs"
          desc="Edit help center"
        />
        <QuickAccessCard
          title="Filters"
          link="/admin/filters"
          desc="Manage filters/disciplines"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

function QuickAccessCard({ title, link, desc }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:bg-blue-50 transition">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{desc}</p>
      <a
        href={link}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        Go to {title}
      </a>
    </div>
  );
}
