"use client";
import { BsChatSquareTextFill } from "react-icons/bs";
import DashboardMainNavbar from "./MainNav";
import DashboardMobileNav from "./MobileNav";
import { MdLogout, MdNotifications } from "react-icons/md";
import { GiNestEggs } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { useSelector } from "react-redux";

const DashboardNavbar = () => {
  const { user } = useSelector((store: any) => store.auth);
  const NavLinks = [
    {
      id: "Blog",
      navItem: <BsChatSquareTextFill />,
      href: "/control-room/manage-blogs",
    },
    {
      id: "TalentNest Experiences",
      navItem: <GiNestEggs />,
      href: "/control-room/manage-reviews",
    },
    {
      id: "Faqs",
      navItem: <FaQuestionCircle />,
      href: "/control-room/manage-faqs",
    },
    {
      id: "Notifications",
      navItem: <MdNotifications />,
      href: "/control-room/notifications",
    },
    {
      id: "Sign Out",
      navItem: <MdLogout />,
      href: "/sign-out",
    },
  ];

  if (user?.accountRole === "SuperAdmin") {
    NavLinks.splice(NavLinks.length - 1, 0, {
      id: "Manage Admins",
      navItem: <FaUserShield />,
      href: "/control-room/manage-admins",
    });
  }

  return (
    <>
      <DashboardMainNavbar NavLinks={NavLinks} />
      <DashboardMobileNav NavLinks={NavLinks} />
    </>
  );
};

export default DashboardNavbar;
