"use client";
import { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import { Applicants } from "@/utilities/typeDefs";
import CTABTN from "../CTA-Button";
import ConfirmCard from "./ConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import { getFormattedStartDate, toolbarOptions } from "@/utilities/constants";
import {
  useCreateOfferLetterDraft,
  useDeclineCandidate,
  useHireCandidate,
} from "@/hooks/hire-decline-hook";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { setOfferDraft } from "@/redux/slices/applicationSlice";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="text-gray-500 italic">
      <span className="animate-pulse">Loading rich text editor...</span>
    </div>
  ),
});

const ConfirmationModal = ({
  hire,
  talentDets,
}: {
  hire: boolean;
  talentDets: Applicants;
}) => {
  const [open, setOpen] = useState(false);
  const [hireDisplay, setHireDisplay] = useState("confirm");
  const { offerDraft } = useSelector((store: any) => store.application);
  const [content, setContent] = useState(offerDraft);
  const { job } = useSelector((store: any) => store.job);
  const { createOffer, loading: confirmLoading } = useCreateOfferLetterDraft();
  const { hireCandidate, loading: hireLoading } = useHireCandidate();
  const { declineCandidate, declineLoading } = useDeclineCandidate();
  const dispatch = useDispatch();
  useEffect(() => {
    setContent(offerDraft);
  }, [offerDraft]);

  const data = {
    html: content,
    talentId: talentDets.talent._id,
    talentMail: talentDets.talent.emailAddress,
    companyName: job.company.companyName,
    jobRole: job.role,
    talentName: `${talentDets.talent.firstName} ${talentDets.talent.lastName}`,
    jobId: job._id,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setHireDisplay("confirm");
      dispatch(setOfferDraft(""));
    }, 100);
  };
  const startDate = getFormattedStartDate();
  const handleCreateDraft = async () => {
    const data = {
      talentName: `${talentDets.talent.firstName} ${talentDets.talent.lastName}`,
      jobRole: job.role,
      companyName: job.company.companyName,
      startDate: startDate,
    };

    await createOffer(data);
    setHireDisplay("offer-draft");
  };

  const handleHireAppl = async () => {
    await hireCandidate(data);
    dispatch(setOfferDraft(""));
  };

  const handleDeclineAppl = async () => {
    await declineCandidate(data);
  };
  return (
    <ModalContainer
      btnCta={hire ? "Hire" : "Decline"}
      btnWidthStyles="block w-full text-left p-1 hover:bg-[#010D3E] text-black hover:text-white cursor-pointer"
      dialogClassName="sm:max-w-lg duration-300 ease-in"
      color="text-black"
      handleOpen={handleOpen}
      open={open}
      handleClose={() => {}}
      background="bg-transparent"
    >
      <main>
        {hire ? (
          <>
            {hireDisplay === "confirm" ? (
              <ConfirmCard
                cta={
                  "This will initiate the hiring process. Are you sure you want to proceed?"
                }
                ctaBtn={"Start Process"}
                actionFunc={handleCreateDraft}
                handleClose={handleClose}
                loading={confirmLoading}
              />
            ) : hireDisplay === "offer-draft" ? (
              <div>
                {" "}
                <div className="flex formdivs flex-col  gap-8">
                  <p className="text-lg font-bold text-[#001E80] ">
                    Offer Letter Draft
                  </p>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    theme="snow"
                    style={{ height: "300px" }}
                    modules={toolbarOptions}
                  />
                </div>{" "}
                <div className=" mt-16 flex gap-3 max-sm:flex-col">
                  <CTABTN
                    route={""}
                    isFunc
                    func={handleHireAppl}
                    CTA={"Send Offer To Candidate"}
                    backGround="bg-[#001E80]"
                    width="px-2 sm:w-[200px] w-full hover:bg-[#001E80]/95  transition ease-in  "
                    height2="h-[40px]"
                    disabled={hireLoading}
                    loading={hireLoading}
                  />
                  <CTABTN
                    route={""}
                    isFunc
                    func={handleClose}
                    CTA={"Cancel"}
                    backGround="bg-red-600"
                    width="sm:w-[170px] w-full hover:bg-red-700 transition ease-in text-sm font-semibold"
                    height2="h-[40px]"
                    disabled={hireLoading}
                  />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <ConfirmCard
            cta={
              "Declining this candidate will remove them from the hiring pipeline. Do you wish to proceed?"
            }
            ctaBtn={"Decline"}
            actionFunc={handleDeclineAppl}
            handleClose={handleClose}
            loading={declineLoading}
          />
        )}
      </main>
    </ModalContainer>
  );
};

export default ConfirmationModal;
