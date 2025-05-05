import React, { useState } from "react";
import { HiMiniBars3BottomLeft, HiMiniChevronRight } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/Elements/UserAvatar";
import Logo from "@/components/Elements/Logo";
import CTABTN from "../Elements/CTA-Button";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

const DashboardMobileNav = ({ NavLinks }: { NavLinks: NavLinks }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden relative ">
      <section className="fixed inset-0 flex justify-between items-center h-24 px-9 max-sm:px-4  bg-[#EAEEFE] z-40">
        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ImCross className="text-2xl text-[#001354] " />
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiMiniBars3BottomLeft className="text-2xl text-[#001354] " />
          </button>
        )}
        <div
          className="cursor-pointer flex items-center"
          onClick={() => router.push("/control-room")}
        >
          <Logo width="35" height="35" text="text-[20px]" gap="gap-1" />
        </div>
        <div className="max-xsm:hidden">
          <UserAvatar />
        </div>
      </section>
      {
        <section
          className={`${
            isOpen ? "translate-y-0 opacity-1" : "-translate-y-full opacity-0"
          } navItem `}
        >
          {NavLinks.map((item, idx) => (
            <ul className={`flex flex-col mb-6`} key={idx}>
              {item.id === "Sign Out" ? null : (
                <li
                  className="sm:text-lg font-semibold text-[#001354] flex justify-between"
                  onClick={() => router.push(item.href)}
                >
                  <span>{item.id}</span>
                  <span>
                    <HiMiniChevronRight />
                  </span>
                </li>
              )}
            </ul>
          ))}

          <div className="flex flex-col md:hidden   gap-4">
            <div className="xsm:hidden mb-14">
              <UserAvatar />
            </div>
            <CTABTN width="w-full h-[54px]" route="/sign-out" CTA="Sign Out" />
          </div>
        </section>
      }
    </nav>
  );
};

export default DashboardMobileNav;
