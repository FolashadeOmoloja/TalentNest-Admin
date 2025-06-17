import { useState } from "react";
import ModalContainer from "../ModalContainer";
import ConfirmCard from "./ConfirmCard";
import { useEndHireProcess } from "@/hooks/hire-decline-hook";

const ClosejobModal = ({ jobId }: { jobId: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { endHireProcess, endLoading } = useEndHireProcess();
  const handleEndHire = async () => {
    await endHireProcess(jobId);
    setOpen(false);
  };
  return (
    <ModalContainer
      btnCta={"End Hiring Process"}
      btnWidthStyles=" h-[50px] w-[200px] max-xxsm:w-full hover:bg-[#001E80]/95 transition text-white cursor-pointer"
      dialogClassName="sm:max-w-lg duration-300 ease-in"
      color="text-black"
      handleOpen={handleOpen}
      open={open}
      handleClose={() => {}}
      background="bg-[#001E80]"
    >
      <main>
        <ConfirmCard
          cta={
            "Ending the hiring process will mark all remaining candidates as declined and close this job role permanently. Are you sure you want to proceed?"
          }
          ctaBtn={"Yes, End Process"}
          actionFunc={handleEndHire}
          handleClose={handleClose}
          loading={endLoading}
        />
      </main>
    </ModalContainer>
  );
};

export default ClosejobModal;
