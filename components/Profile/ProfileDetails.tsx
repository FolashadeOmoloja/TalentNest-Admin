"use client";

import ProfileBox, {
  DownloadResumeBox,
} from "@/components/Elements/ProfileBox";
import {
  useDeleteCompanyProfile,
  useDeleteTalentProfile,
} from "@/hooks/admin-analytics-hook";
import { useGetAllCompanyEmployed } from "@/hooks/application-hook";
import { useGetCompanyJobs } from "@/hooks/jobPosts-hook";
import {
  handleSendCompanyNotification,
  handleSendTalentNotification,
} from "@/hooks/notification-hook";
import { userObject, userCompanyObject } from "@/utilities/typeDefs";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import validator from "validator";

type ProfileDetailsProps<T extends boolean> = {
  skillsBool: T;
  user: T extends true ? userObject : userCompanyObject;
};

const validationRules = {
  url: {
    required: "Your LinkedIn URL is required",
    pattern: {
      value: /^https:\/\/(www\.)?calendly\.com\/.*$/,
      message: "Invalid LinkedIn URL",
    },
  },
};

const ProfileDetails = <T extends boolean>({
  skillsBool,
  user,
}: ProfileDetailsProps<T>) => {
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [schedulePrompt, setSchedulePrompt] = useState(false);
  const [notifyPrompt, setNotifyPrompt] = useState(false);
  const { onSubmit: deleteTalent } = useDeleteTalentProfile();
  const { fetchJobs } = useGetCompanyJobs();
  const { fetchApplicants } = useGetAllCompanyEmployed();
  const { onSubmit: sendNotification, loading } =
    handleSendCompanyNotification();
  const { onSubmit: sendTalentNotification } = handleSendTalentNotification();
  const { onSubmit: deleteCompany } = useDeleteCompanyProfile();
  const { job } = useSelector((store: any) => store.job);
  const deleteProfile = () => {
    deleteTalent((user as userObject)._id);
  };
  const deleteCompanyProfile = () => {
    deleteCompany((user as userCompanyObject)._id);
  };

  const viewJobs = () => {
    fetchApplicants((user as userCompanyObject)._id);
    fetchJobs((user as userCompanyObject)._id);
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const linkRef = useRef<HTMLAnchorElement>(null);

  const openCalendly = () => {
    const link = linkRef.current;
    if (link) {
      link.href = "https://calendly.com/";
      link.click();
    }
  };

  const onTalentSubmit = (data: any) => {
    const meetingUrl = data.meetingUrl.trim();
    const sanitizedMeetingUrl = validator.isURL(meetingUrl) ? meetingUrl : "#";
    const senderMessage = `
    You sent a notification to <b>${(user as userObject).firstName} ${
      (user as userObject).lastName
    }</b> 
    to pick an available time for an interview ${
      job.length > 0
        ? `for the ${job.title} role at ${job.company.companyName}`
        : ""
    }.<br /> 
    Here is the meeting link: <a href="${sanitizedMeetingUrl}" target="_blank">Click here</a>
  `;
    const receiverMessage = `You have been shorlisted ${
      job.length > 0
        ? `for the ${job.title} role at ${job.company.companyName}`
        : ""
    }. Please select a convenient date and time for the meeting by using the following link:\n <a href="${sanitizedMeetingUrl}" target="_blank">Click here</a>`;

    sendTalentNotification(
      (user as userObject)._id,
      senderMessage,
      receiverMessage,
      sanitizedMeetingUrl
    );
  };

  const onSubmit = (data: any) => {
    const meetingUrl = data.meetingUrl.trim();
    const sanitizedMeetingUrl = validator.isURL(meetingUrl) ? meetingUrl : "#";
    const senderMessage = `
    You sent a notification to <b>${
      (user as userCompanyObject).companyName
    }</b> 
    to pick an available time for a meeting.<br /> 
    Here is the meeting link: <a href="${sanitizedMeetingUrl}" target="_blank">Click here</a>
  `;
    const receiverMessage = `We would like to meet with your team to discuss your hiring needs. Please select a convenient date and time for the meeting by using the following link:\n <a href="${sanitizedMeetingUrl}" target="_blank">Click here</a>`;

    sendNotification(
      (user as userCompanyObject)._id,
      senderMessage,
      receiverMessage,
      sanitizedMeetingUrl
    );
  };

  return (
    <section className="basis-[70%]">
      <section
        className={`bg-white rounded-2xl shadow-md  lg:h-full p-9 max-slg:p-7 max-sm:px-4 transition duration-500`}
      >
        {skillsBool ? (
          <section>
            <ProfileBox
              title={"Full Name"}
              details={`${(user as userObject)?.firstName} ${
                (user as userObject).lastName
              }`}
            />
            <ProfileBox title={"Email Address"} details={user.emailAddress} />
            <ProfileBox
              title={"Mobile Number"}
              details={user?.countryCode + user?.phoneNumber}
            />
            <ProfileBox
              title={"Experience Level"}
              details={`${(user as userObject)?.experienceLevel} `}
            />
            <ProfileBox
              title={"Years of Experience"}
              details={`${(user as userObject)?.experienceYears} `}
            />
            <ProfileBox
              title={"Industry"}
              details={(user as userObject)?.industry}
            />
            <ProfileBox
              title={"Work mode preference"}
              details={user?.preference}
            />
            <DownloadResumeBox
              title={"Resume"}
              filename={(user as userObject)?.resume}
            />
            <ProfileBox
              title={"Primary Skills to offer"}
              details={`${(user as userObject)?.skills.join(",")} `}
            />
            {!schedulePrompt ? (
              <div>
                <button
                  className="py-4 px-6 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover"
                  onClick={() => setSchedulePrompt(true)}
                >
                  Schedule a Meeting
                </button>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Schedule Meeting with talent and notify)
                </span>
              </div>
            ) : (
              <div>
                <div className="flex lg:gap-5 gap-0 max-lg:flex-col ">
                  <a ref={linkRef} style={{ display: "none" }} target="_blank">
                    hidden download link
                  </a>
                  <button
                    className="py-4 px-9 bg-[#001E80] text-white rounded-md font-semibold mt-6  max-w-[180px]"
                    onClick={openCalendly}
                  >
                    Schedule
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover max-w-[180px]"
                    onClick={() => setNotifyPrompt(true)}
                  >
                    Notify
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover max-w-[180px]"
                    onClick={() => {
                      setSchedulePrompt(false);
                      setNotifyPrompt(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Schedule Meeting with talent and notify)
                </span>
              </div>
            )}
            {notifyPrompt && (
              <form onSubmit={handleSubmit(onTalentSubmit)}>
                <div className="flex gap-3 formdivs mt-4">
                  <input
                    type="url"
                    placeholder="Enter calendly meeting link"
                    {...register("meetingUrl", {
                      required: validationRules.url.required,
                      pattern: validationRules.url.pattern,
                    })}
                  />
                  <button
                    type="submit"
                    className="basis-[20%] p-3 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        loading
                      </div>
                    ) : (
                      "Notify"
                    )}
                  </button>
                </div>
              </form>
            )}
            {!deletePrompt ? (
              <div>
                <button
                  className="py-4 px-6 bg-red-700 text-white rounded-md font-semibold mt-14 btn-hover hover:bg-red-800"
                  onClick={() => setDeletePrompt(true)}
                >
                  Delete Talent Profile
                </button>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Delete profile permanently from database)
                </span>
              </div>
            ) : (
              <div>
                <div className="flex gap-5">
                  <button
                    className="py-4 px-9 bg-red-700 text-white rounded-md font-semibold mt-14 btn-hover hover:bg-red-800"
                    onClick={deleteProfile}
                  >
                    Delete
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-14 btn-hover "
                    onClick={() => setDeletePrompt(false)}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Delete profile permanently from database)
                </span>
              </div>
            )}
          </section>
        ) : (
          <section>
            <ProfileBox
              title={"Company Name"}
              details={`${(user as userCompanyObject)?.companyName} `}
            />
            <ProfileBox
              title={"Full Name"}
              details={`${(user as userCompanyObject)?.firstName} ${
                (user as userCompanyObject)?.lastName
              }`}
            />
            <ProfileBox
              title={"Role"}
              details={(user as userCompanyObject)?.companyRole}
            />
            <ProfileBox title={"Email Address"} details={user?.emailAddress} />
            <ProfileBox
              title={"Mobile Number"}
              details={user?.countryCode + user?.phoneNumber}
            />
            <ProfileBox
              title={"Industry"}
              details={`${(user as userCompanyObject)?.industry.join(", ")} `}
            />
            <ProfileBox title={"Work Culture"} details={user?.preference} />
            <button
              className="py-4 px-6 bg-[#001E80] text-white rounded-md font-semibold mt-14 "
              onClick={viewJobs}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching Jobs
                </div>
              ) : (
                "View jobs posted"
              )}
            </button>
            <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
              (View all jobs posted by company)
            </span>
            {!schedulePrompt ? (
              <div>
                <button
                  className="py-4 px-6 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover"
                  onClick={() => setSchedulePrompt(true)}
                >
                  Schedule a Meeting
                </button>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Schedule Meeting with company and notify)
                </span>
              </div>
            ) : (
              <div>
                <div className="flex lg:gap-5 gap-0 max-lg:flex-col ">
                  <a ref={linkRef} style={{ display: "none" }} target="_blank">
                    hidden download link
                  </a>
                  <button
                    className="py-4 px-9 bg-[#001E80] text-white rounded-md font-semibold mt-6  max-w-[180px]"
                    onClick={openCalendly}
                  >
                    Schedule
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover max-w-[180px]"
                    onClick={() => setNotifyPrompt(true)}
                  >
                    Notify
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover max-w-[180px]"
                    onClick={() => {
                      setSchedulePrompt(false);
                      setNotifyPrompt(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Schedule Meeting with company and notify)
                </span>
              </div>
            )}
            {notifyPrompt && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-3 formdivs mt-4">
                  <input
                    type="url"
                    placeholder="Enter calendly meeting link"
                    {...register("meetingUrl", {
                      required: validationRules.url.required,
                      pattern: validationRules.url.pattern,
                    })}
                  />
                  <button
                    type="submit"
                    className="basis-[20%] p-3 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        loading
                      </div>
                    ) : (
                      "Notify"
                    )}
                  </button>
                </div>
              </form>
            )}
            {!deletePrompt ? (
              <div>
                <button
                  className="py-4 px-6 bg-red-700 text-white rounded-md font-semibold mt-6 btn-hover hover:bg-red-800"
                  onClick={() => setDeletePrompt(true)}
                >
                  Delete Company's Profile
                </button>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Delete profile permanently from database)
                </span>
              </div>
            ) : (
              <div>
                <div className="flex sm:gap-5 gap-0 max-sm:flex-col ">
                  <button
                    className="py-4 px-9 bg-red-700 text-white rounded-md font-semibold mt-6 btn-hover hover:bg-red-800 max-w-[180px]"
                    onClick={deleteCompanyProfile}
                  >
                    Delete
                  </button>
                  <button
                    className="py-4 px-9 bg-[#010D3E] text-white rounded-md font-semibold mt-6 btn-hover max-w-[180px] "
                    onClick={() => setDeletePrompt(false)}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-sm mt-3 w-full text-[#010D3E] font-semibold  italic block">
                  (Delete profile permanently from database)
                </span>
              </div>
            )}
          </section>
        )}
      </section>
    </section>
  );
};

export default ProfileDetails;
