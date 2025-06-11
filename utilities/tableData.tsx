import { Column } from "react-table";
import {
  userCompanyObject,
  userObject,
  JobPosted,
  Applicants,
  SuccessApplications,
  BlogPosts,
  Reviews,
  Faqs,
  Admin,
} from "./typeDefs";
import { DownloadResumeBotton } from "@/components/Elements/ProfileBox";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CTABTN from "@/components/Elements/CTA-Button";
import { setTalent } from "@/redux/slices/talentSlice";
import { setCompany } from "@/redux/slices/companySlice";
import { formatTimeDifference } from "./constants";
import { setJob } from "@/redux/slices/jobSlice";
import { useDeleteCompanyJob } from "@/hooks/jobPosts-hook";
import ApplicantsCard from "@/components/Elements/ApplicantsCard";
import { setblogPost } from "@/redux/slices/blogPostslice";
import { setReview } from "@/redux/slices/reviewSlice";
import { setFaq } from "@/redux/slices/faqSlice";
import { setAdmin } from "@/redux/slices/adminSlice";

export const talentsColumn: Column<userObject>[] = [
  {
    Header: "",
    accessor: "firstName",
    Cell: ({ row }: { row: { original: userObject } }) => {
      return (
        <div className="flex flex-col gap-4 ">
          <span className="max-slg:text-lg text-[#010D3E]">
            {row.original.firstName} {row.original.lastName}
          </span>
          <span className="text-base font-semibold">
            {row.original.profession}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "profileImage",
    Cell: ({ row }: { row: { original: userObject } }) => {
      return (
        <div className="p-7">
          <div
            className="h-[60px] w-[50px] rounded-full overflow-hidden "
            style={{ width: "50px", height: "50px" }}
          >
            {row.original.profileImage ? (
              <img
                src={row.original.profileImage}
                alt=""
                className="object-center object-cover w-full h-full"
              />
            ) : (
              <section
                className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered`}
                style={{ background: row.original.hex }}
              >
                {row.original.firstName[0]}
              </section>
            )}
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "experienceLevel",
    Cell: ({ row }: { row: { original: userObject } }) => {
      return (
        <div className="flex flex-col gap-4 ">
          <span>{row.original.experienceLevel}</span>
          <span>{row.original.experienceYears}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "emailAddress",
    Cell: ({ row }: { row: { original: userObject } }) => {
      return (
        <div className="flex flex-col gap-4 w-[200px]">
          <span>{row.original.emailAddress}</span>
          <span>{row.original.location}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "filename",
    Cell: ({ row }: { row: { original: userObject } }) => {
      return <DownloadResumeBotton filename={row.original.resume} />;
    },
  },
  {
    Header: "",
    accessor: "accountStatus",
    Cell: ({ row }: { row: { index: number; original: userObject } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const ManageProfile = (idx: any, data: any) => {
        dispatch(setTalent(data));
        router.push(`/control-room/manage-talents/${idx}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => ManageProfile(row.index, row.original)}
          CTA="Manage"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const companyColumn: Column<userCompanyObject>[] = [
  {
    Header: "",
    accessor: "firstName",
    Cell: ({ row }: { row: { original: userCompanyObject } }) => {
      return (
        <div className="flex flex-col gap-4 ">
          <span className="max-slg:text-lg text-[#010D3E]">
            {row.original.companyName}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "profileImage",
    Cell: ({ row }: { row: { original: userCompanyObject } }) => {
      return (
        <div className="p-7">
          <div
            className="h-[60px] w-[50px] rounded-full overflow-hidden "
            style={{ width: "50px", height: "50px" }}
          >
            {row.original.profileImage ? (
              <img
                src={row.original.profileImage}
                alt=""
                className="object-center object-cover w-full h-full"
              />
            ) : (
              <section
                className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered`}
                style={{ background: row.original.hex }}
              >
                {row.original.companyName[0]}
              </section>
            )}
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "emailAddress",
    Cell: ({ row }: { row: { original: userCompanyObject } }) => {
      return (
        <div className="flex flex-col gap-4 ">
          <span>{row.original.emailAddress}</span>
          <span>{row.original.linkedInUrl}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "industry",
    Cell: ({ row }: { row: { original: userCompanyObject } }) => {
      return (
        <div className="flex flex-col gap-4 w-[200px]">
          <span>{row.original.industry.join(", ")}</span>
          <span>
            {row.original.location}
            {",  "} {row.original.country}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "accountStatus",
    Cell: ({
      row,
    }: {
      row: { index: number; original: userCompanyObject };
    }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const ManageProfile = (idx: any, data: any) => {
        dispatch(setCompany(data));
        router.push(`/control-room/manage-companies/${idx}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => ManageProfile(row.index, row.original)}
          CTA="Manage"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const companyActiveColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "company",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="p-7">
            <div
              className="h-[60px] w-[50px] rounded-full overflow-hidden "
              style={{ width: "50px", height: "50px" }}
            >
              {row.original.company.profileImage ? (
                <img
                  src={row.original.company.profileImage}
                  alt=""
                  className="object-center object-cover w-full h-full"
                />
              ) : (
                <section
                  className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered bg-[#010D3E]`}
                >
                  {row.original.company.companyName[0]}
                </section>
              )}
            </div>
          </div>
          <span>{row.original.company.companyName}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      const postDate = formatTimeDifference(
        row.original.createdAt || row.original.updatedAt
      );
      return (
        <div className="flex flex-col gap-4">
          <span className="text-[#010D3E] font-medium">
            {row.original.title}
          </span>
          <span>{postDate}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.department}</span>
          <span>{row.original.location}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.jobProximity}</span>
          <span>
            ${row.original.salaryRange1} - ${row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "applicants",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const viewJob = (data: any, idx: number) => {
        dispatch(setJob(data));
        router.push(`/control-room/manage-jobs/${idx}`);
      };
      return (
        <CTABTN
          route={``}
          isFunc
          func={() => viewJob(row.original, row.index)}
          CTA="View Job"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const closedJobsColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "company",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="p-7">
            <div
              className="h-[60px] w-[50px] rounded-full overflow-hidden "
              style={{ width: "50px", height: "50px" }}
            >
              {row.original.company.profileImage ? (
                <img
                  src={row.original.company.profileImage}
                  alt=""
                  className="object-center object-cover w-full h-full"
                />
              ) : (
                <section
                  className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered bg-[#010D3E]`}
                >
                  {row.original.company.companyName[0]}
                </section>
              )}
            </div>
          </div>
          <span>{row.original.company.companyName}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      const postDate = formatTimeDifference(
        row.original.createdAt || row.original.updatedAt
      );
      return (
        <div className="flex flex-col gap-4">
          <span className="text-[#010D3E] font-medium">
            {row.original.title}
          </span>
          <span>{postDate}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.department}</span>
          <span>{row.original.location}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.jobProximity}</span>
          <span>
            ${row.original.salaryRange1} - ${row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "status",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const viewJob = (data: any, id: string) => {
        const encodedId = btoa(id);
        dispatch(setJob(data));
        router.push(`/control-room/manage-jobs/closed-jobs/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => viewJob(row.original, row.original._id)}
          CTA="Delete Job"
          height2="h-[50px] text-sm"
          backGround="bg-red-700 hover:bg-red-800"
        />
      );
    },
  },
];

export const singleCompanyColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      const postDate = formatTimeDifference(
        row.original.createdAt || row.original.updatedAt
      );
      return (
        <div className="flex flex-col gap-4">
          <span className="text-[#010D3E] font-medium">
            {row.original.title}
          </span>
          <span className="font-normal text-base">{postDate}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.department}</span>
          <span>{row.original.location}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.jobProximity}</span>
          <span>
            ${row.original.salaryRange1} - ${row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "applicants",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const viewJob = (data: any, idx: number) => {
        dispatch(setJob(data));
        router.push(`/control-room/manage-jobs/${idx}`);
      };
      return (
        <CTABTN
          route={``}
          isFunc
          func={() => viewJob(row.original, row.index)}
          CTA="View Job"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const singleCompClosedJobsColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      const postDate = formatTimeDifference(
        row.original.createdAt || row.original.updatedAt
      );
      return (
        <div className="flex flex-col gap-4">
          <span className="text-[#010D3E] font-medium">
            {row.original.title}
          </span>
          <span className="font-normal text-base">{postDate}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.department}</span>
          <span>{row.original.location}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "experience",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.experience}</span>
          <span>{row.original.jobHours}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span>{row.original.jobProximity}</span>
          <span>
            ${row.original.salaryRange1} - ${row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "status",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const viewJob = (data: any, id: string) => {
        const encodedId = btoa(id);
        dispatch(setJob(data));
        router.push(
          `/control-room/manage-companies/jobs/closed-jobs/${encodedId}`
        );
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => viewJob(row.original, row.original._id)}
          CTA="Delete Job"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const ApplicationsColumns: Column<Applicants>[] = [
  {
    Header: "",
    accessor: "talent",
    Cell: ({ row }: { row: { index: number; original: Applicants } }) => {
      const postDate = formatTimeDifference(row.original.createdAt);
      return (
        <ApplicantsCard item={row.original} key={row.index} isUnderReview />
      );
    },
  },
];
export const ShortListColumns: Column<Applicants>[] = [
  {
    Header: "",
    accessor: "talent",
    Cell: ({ row }: { row: { index: number; original: Applicants } }) => {
      return (
        <ApplicantsCard
          item={row.original}
          key={row.index}
          isUnderReview={false}
        />
      );
    },
  },
];
export const InterviewColumns: Column<Applicants>[] = [
  {
    Header: "",
    accessor: "talent",
    Cell: ({ row }: { row: { index: number; original: Applicants } }) => {
      return (
        <ApplicantsCard
          item={row.original}
          key={row.index}
          isUnderReview={false}
          interview
        />
      );
    },
  },
];

export const successHireColumns: Column<SuccessApplications>[] = [
  {
    Header: "",
    accessor: "job",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <div className="flex flex-col gap-2 mt-4 mb-4">
          <span className="text-[#010D3E] font-medium">
            {row.original.job.title}
          </span>
          <div className="flex flex-col gap-4 text-base">
            <span>{row.original.job.company.companyName}</span>
            <span>
              {row.original.job.company.location},{" "}
              {row.original.job.company.country}{" "}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "talent",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <section className="flex flex-col gap-3 ">
          <div className="p-7">
            <div
              className="h-[60px] w-[50px] rounded-full overflow-hidden "
              style={{ width: "50px", height: "50px" }}
            >
              {row.original.talent.profileImage ? (
                <img
                  src={row.original.talent.profileImage}
                  alt=" "
                  className="object-center object-cover w-full h-full"
                />
              ) : (
                <section
                  className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered bg-[#010D3E]`}
                >
                  {row.original.talent.firstName[0]}
                </section>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Name: </span>{" "}
              {row.original.talent.firstName}
              {row.original.talent.lastName}
            </p>
            <p>
              <span className="font-semibold">
                Profession: {row.original.talent.profession}
              </span>
            </p>
          </div>
        </section>
      );
    },
  },
  {
    Header: "",
    accessor: "status",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <div className="flex flex-col gap-2">
          <p>
            {" "}
            <span className="font-semibold">Industry: </span>
            {row.original.talent.industry}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Level: </span>
            {row.original.talent.experienceLevel}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Experience: </span>
            {row.original.talent.experienceYears}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {row.original.talent.location}, {row.original.talent.country}{" "}
          </p>
        </div>
      );
    },
  },
];
export const blogPostColumns: Column<BlogPosts>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: BlogPosts } }) => {
      const postDate = formatTimeDifference(
        row.original.updatedAt || row.original.createdAt
      );
      return (
        <div className="flex flex-col gap-4">
          <span style={{ color: "#010d3e" }}>{row.original.title}</span>
          <div className="flex flex-col gap-2 text-base">
            <span>{row.original.author}</span>
            <p className="text-sm ">
              <span className="font-semibold">Created: </span>
              {postDate}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "content",
    Cell: ({ row }: { row: { index: number; original: BlogPosts } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const editBlog = (id: any, data: any) => {
        const encodedId = btoa(id);
        dispatch(setblogPost(data));
        router.push(`/control-room/manage-blogs/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => editBlog(row.original._id, row.original)}
          CTA="Edit"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const reviewColumns: Column<Reviews>[] = [
  {
    Header: "",
    accessor: "review",
    Cell: ({ row }: { row: { original: Reviews } }) => {
      const postDate = formatTimeDifference(row.original.createdAt);
      return (
        <div className="flex flex-col gap-4 mb-3 mt-3">
          <span style={{ color: "#010d3e", maxWidth: "700px" }}>
            {row.original.review}
          </span>
          <div className="flex flex-col gap-2 text-base">
            <span>{row.original.fullname}</span>
            <span>{row.original.role}</span>
            <p className="text-sm ">
              <span className="font-semibold">Created: </span>
              {postDate}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "role",
    Cell: ({ row }: { row: { index: number; original: Reviews } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const editReview = (id: any, data: any) => {
        const encodedId = btoa(id);
        dispatch(setReview(data));
        router.push(`/control-room/manage-reviews/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => editReview(row.original._id, row.original)}
          CTA="Edit"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];
export const faqColumns: Column<Faqs>[] = [
  {
    Header: "",
    accessor: "question",
    Cell: ({ row }: { row: { original: Faqs } }) => {
      const postDate = formatTimeDifference(row.original.createdAt);
      return (
        <div className="flex flex-col gap-4 text-base mb-3 mt-3">
          <span style={{ color: "#010d3e" }}>Q: {row.original.question}</span>
          <div className="font-normal">
            <p className="mb-5" style={{ maxWidth: "700px" }}>
              A: {row.original.answer}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Created: </span>
              {postDate}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "img",
    Cell: ({ row }: { row: { index: number; original: Faqs } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const editFaq = (id: any, data: any) => {
        const encodedId = btoa(id);
        dispatch(setFaq(data));
        router.push(`/control-room/manage-faqs/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => editFaq(row.original._id, row.original)}
          CTA="Edit"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];

export const adminColumn: Column<Admin>[] = [
  {
    Header: "",
    accessor: "firstName",
    Cell: ({ row }: { row: { original: Admin } }) => {
      return (
        <div className="flex flex-col gap-4 ">
          <span className="max-slg:text-lg" style={{ color: "#010D3E" }}>
            {row.original.firstName} {row.original.lastName}
          </span>
          <span className="text-base font-semibold">
            {row.original.emailAddress}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "accountRole",
    Cell: ({ row }: { row: { original: Admin } }) => {
      return (
        <span className="font-semibold text-[#010D3E]">
          {row.original.accountRole}
        </span>
      );
    },
  },
  {
    Header: "",
    accessor: "_id",
    Cell: ({ row }: { row: { index: number; original: Admin } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const updateAdmin = (id: any, data: any) => {
        const encodedId = btoa(id);
        dispatch(setAdmin(data));
        router.push(`/control-room/manage-admins/update/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => updateAdmin(row.original._id, row.original)}
          CTA="Update"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
  {
    Header: "",
    accessor: "password",
    Cell: ({ row }: { row: { index: number; original: Admin } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const updateAdmin = (id: any, data: any) => {
        const encodedId = btoa(id);
        dispatch(setAdmin(data));
        router.push(`/control-room/manage-admins/reset-password/${encodedId}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => updateAdmin(row.original._id, row.original)}
          CTA="Reset password"
          height2="h-[50px] text-sm"
          backGround="bg-[#010D3E]"
        />
      );
    },
  },
];
