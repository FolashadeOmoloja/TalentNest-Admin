"use client";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import DashboardNavbar from "@/components/Navbar/Navbar";
import {
  useGetAllCompanies,
  useGetAllTalents,
} from "@/hooks/admin-analytics-hook";
import { useGetAllEmployed } from "@/hooks/application-hook";
import { useGetAllJobs } from "@/hooks/jobPosts-hook";
import { JobPosted, userObject } from "@/utilities/typeDefs";
import { Briefcase, FileText, LayoutDashboard, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Application {
  job: JobPosted;
  talent: userObject;
}

const page = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refresh = searchParams.get("refresh");

    if (refresh) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  const { talents } = useGetAllTalents();
  const { companies } = useGetAllCompanies();
  const { successApplications } = useGetAllEmployed();

  const uniqueJobs: JobPosted[] = [];
  const uniqueTalents: userObject[] = [];

  // Create sets to track IDs and ensure uniqueness
  const jobIds = new Set<string>();
  const talentIds = new Set<string>();

  successApplications.forEach((application: Application) => {
    // Check for job duplicates
    if (!jobIds.has(application.job?._id)) {
      jobIds.add(application.job?._id);
      uniqueJobs.push(application.job);
    }

    // Check for talent duplicates
    if (!talentIds.has(application.talent?._id)) {
      talentIds.add(application.talent?._id);
      uniqueTalents.push(application?.talent);
    }
  });

  const { jobs } = useGetAllJobs();

  const filterJobs = (status: string) => {
    return jobs.filter((job) =>
      //@ts-ignore
      job.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  const filterTalents = (accountStatus: string) => {
    return talents.filter((talent) =>
      //@ts-ignore
      talent.accountStatus?.toLowerCase().includes(accountStatus.toLowerCase())
    );
  };

  const filterCompanies = (accountStatus: string) => {
    return companies.filter((company) =>
      //@ts-ignore
      company.accountStatus?.toLowerCase().includes(accountStatus.toLowerCase())
    );
  };
  const shortList = talents.length != 0 ? filterTalents("shortlist") : [];
  const hiringList = companies.length != 0 ? filterCompanies("recruiting") : [];
  const openedJobs = jobs.length != 0 ? filterJobs("open") : [];

  const companyAnalytics = [
    {
      analtyticsTitle: "Job Offers",
      stats: jobs.length != 0 ? jobs.length : 0,
      desc: <Briefcase />,
    },
    {
      analtyticsTitle: "Nested Talents",
      stats: talents.length != 0 ? talents.length : 0,
      desc: <Users />,
    },
    {
      analtyticsTitle: "Nested Companies",
      stats: companies.length != 0 ? companies.length : 0,
      desc: <LayoutDashboard />,
    },
    {
      analtyticsTitle: "Employed Talents",
      stats: uniqueTalents.length != 0 ? uniqueTalents.length : 0,
      desc: <FileText />,
    },
  ];

  const chartData = [
    { name: "Jan", jobs: 3, talents: 2, companies: 1 },
    { name: "Feb", jobs: 4, talents: 3, companies: 2 },
    { name: "Mar", jobs: 5, talents: 4, companies: 2 },
    { name: "Apr", jobs: 6, talents: 5, companies: 3 },
    { name: "May", jobs: 7, talents: 6, companies: 4 },
  ];

  return (
    <>
      <DashboardNavbar />
      <DashboardLayout
        analytics={companyAnalytics}
        chartData={chartData}
        stat1={`${openedJobs.length} active job listings`}
        stat2={`${shortList.length} talents shortlisted on TalentNest`}
        stat3={`${hiringList.length} compan${
          hiringList.length === 1 ? "y" : "ies"
        } currently hiring`}
        stat4={`${
          uniqueJobs.length != 0 ? uniqueJobs.length : 0
        } Job Categories`}
      />
    </>
  );
};

export default page;
