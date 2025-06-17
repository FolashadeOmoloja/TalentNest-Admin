import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { Cancel } from "../ApplicantCardElements";

const ViewNotes = ({ notes }: { notes: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContainer
      btnCta={"View Notes"}
      btnWidthStyles="w-[180px] hover:bg-[#001E80]/95 transition hover:text-white cursor-pointer"
      dialogClassName="sm:max-w-lg duration-300 ease-in"
      color="text-[#001E80]"
      handleOpen={handleOpen}
      open={open}
      handleClose={handleClose}
      background="bg-transparent border-[#001E80] border-2"
    >
      <main>
        <div className={`w-full flex mb-2 justify-end`}>
          <Cancel handleClose={handleClose} />
        </div>
        <p className="text-[#001E80] text-lg text-center mb-5 font-semibold">
          Applicant's match feedback
        </p>
        <p className="text-sm text-justify">{notes}</p>
      </main>
    </ModalContainer>
  );
};

export default ViewNotes;
