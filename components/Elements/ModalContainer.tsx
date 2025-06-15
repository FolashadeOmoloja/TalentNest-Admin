"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import CTABTN from "./CTA-Button";

export default function ModalContainer({
  btnCta,
  btnWidthStyles,
  dialogClassName,
  children,
  open,
  handleClose,
  handleOpen,
  background = "bg-[#001E80]",
  color = "text-white",
}: {
  btnCta: string;
  btnWidthStyles: string;
  dialogClassName: string;
  children: React.ReactNode;
  open: boolean;
  background?: string;
  color?: string;
  handleOpen: () => void;
  handleClose: () => void;
}) {
  return (
    <div>
      <CTABTN
        route={""}
        isFunc
        func={handleOpen}
        CTA={btnCta}
        backGround={background}
        width={btnWidthStyles}
        height2="h-[40px] text-sm"
        color={color}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        className="relative z-[200] transition-all duration-300 ease-in"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className={`relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8  sm:p-6 sm:w-full ${dialogClassName} data-closed:sm:translate-y-0 data-closed:sm:scale-95`}
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
