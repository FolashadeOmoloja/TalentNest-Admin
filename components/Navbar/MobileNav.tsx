"use client";
import React, { useState } from "react";
import { HiMiniBars3BottomLeft, HiMiniChevronRight } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import CTABTN from "../Elements/CTA-Button";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/Elements/UserAvatar";
import { useSelector } from "react-redux";

type NavLinks = {
  navItem: string;
  href: string;
}[];

type DropDown = {
  navItem: string;
  icon: string;
  href: string;
}[];
const DashboardMobileNav = ({
  NavLinks,
  DropDown,
  buttonLink,
  buttonCta,
}: {
  NavLinks: NavLinks;
  DropDown: DropDown;
  buttonLink: string;
  buttonCta: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store: any) => store.auth);

  return (
    <nav className="md:hidden relative ">
      <section className="fixed inset-0 flex justify-between items-center h-24 px-9 max-sm:px-4  bg-white z-40">
        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ImCross className="text-3xl text-[#010D3E] " />
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiMiniBars3BottomLeft className="text-3xl text-[#010D3E] " />
          </button>
        )}
        <div onClick={() => router.push("/")}>
          <img
            src="/images/homepage/TalentNestlogo.png"
            alt="logo"
            className="max-sm:w-[119px]"
          />
        </div>
        <div className="max-xsm:hidden">
          <UserAvatar dropDown={DropDown} />
        </div>
      </section>
      {
        <section
          className={`${
            isOpen ? "translate-y-0 opacity-1" : "-translate-y-full opacity-0"
          } navItem`}
        >
          {NavLinks.map((item, idx) => (
            <ul className={`flex flex-col gap-14 mb-8`} key={idx}>
              <li
                className="sm:text-lg font-semibold text-[#010D3E] flex justify-between"
                onClick={() => router.push(item.href)}
              >
                <span>{item.navItem}</span>
                <span>
                  <HiMiniChevronRight />
                </span>
              </li>
            </ul>
          ))}
          <ul className={`flex flex-col gap-14 mb-8`}>
            <li
              className="sm:text-lg font-semibold text-[#010D3E] flex justify-between"
              onClick={() => router.push(DropDown[0].href)}
            >
              <span>{DropDown[0].navItem}</span>
              <span>
                <HiMiniChevronRight />
              </span>
            </li>
          </ul>
          <div className="flex flex-col md:hidden   gap-4">
            <div className="xsm:hidden">
              <UserAvatar dropDown={DropDown} />
            </div>
            {user?.accountRole === "SuperAdmin" && (
              <button
                className="bg-[#22CCED] h-[55px] rounded-[6px] font-semibold"
                onClick={() => {
                  router.push(buttonLink);
                }}
              >
                {buttonCta}
              </button>
            )}

            <CTABTN width="w-full" route="/sign-out" CTA="Sign Out" />
          </div>
        </section>
      }
    </nav>
  );
};

export default DashboardMobileNav;
