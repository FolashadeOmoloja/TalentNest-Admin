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
    if (!jobIds.has(application.job._id)) {
      jobIds.add(application.job._id);
      uniqueJobs.push(application.job);
    }

    // Check for talent duplicates
    if (!talentIds.has(application.talent._id)) {
      talentIds.add(application.talent._id);
      uniqueTalents.push(application.talent);
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
  const closedJobs = jobs.length != 0 ? filterJobs("closed") : [];

  const companyAnalytics = [
    {
      analtyticsTitle: "Total Job Offers",
      stats: jobs.length != 0 ? jobs.length : 0,
      desc: `${openedJobs.length} active job listings`,
      link: "/control-room/manage-jobs",
      linkName: "Manage Jobs",
    },
    {
      analtyticsTitle: "Total Talents Registered",
      stats: talents.length != 0 ? talents.length : 0,
      desc: `${shortList.length} talents shortlisted on TalentNest`,
      link: "/control-room/manage-talents",
      linkName: "Manage Talents",
    },
    {
      analtyticsTitle: "Total Companies Registered",
      stats: companies.length != 0 ? companies.length : 0,
      desc: `${hiringList.length} compan${
        hiringList.length === 1 ? "y" : "ies"
      } currently hiring`,
      link: "/control-room/manage-companies",
      linkName: "Manage Companies",
    },
    {
      analtyticsTitle: "Employed Talents",
      stats: uniqueTalents.length != 0 ? uniqueTalents.length : 0,
      desc: `${uniqueJobs.length != 0 ? uniqueJobs.length : 0} Job Categories`,
      link: "/control-room/successful-hires",
      linkName: "View Details",
    },
  ];
  return (
    <>
      <DashboardNavbar activeItem={0} />
      <DashboardLayout
        dashInfo="This provides a summary of your TalentNest details"
        analytics={companyAnalytics}
      />
    </>
  );
};

export default page;
