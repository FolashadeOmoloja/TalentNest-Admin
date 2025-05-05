import DashboardMainNavbar from "./MainNav";
import DashboardMobileNav from "./MobileNav";

const NavLinks = [
  {
    navItem: "Dashboard",
    href: "/control-room",
  },
  {
    navItem: "Blog",
    href: "/control-room/manage-blogs",
  },
  {
    navItem: "Reviews",
    href: "/control-room/manage-reviews",
  },
  {
    navItem: "Faqs",
    href: "/control-room/manage-faqs",
  },
];

const DropDown = [
  {
    navItem: "Notifications",
    icon: "/images/dashboard/icon1.svg",
    href: "/control-room/notifications",
  },
  {
    navItem: "Sign Out",
    icon: "/images/dashboard/icon2.svg",
    href: "/sign-out",
  },
];

const DashboardNavbar = ({ activeItem }: { activeItem?: number }) => {
  return (
    <>
      <DashboardMainNavbar
        activeItem={activeItem}
        NavLinks={NavLinks}
        buttonLink="/control-room/manage-admins"
        buttonCta="Manage Admin"
        DropDown={DropDown}
      />
      <DashboardMobileNav
        NavLinks={NavLinks}
        buttonLink="/control-room/manage-admins"
        buttonCta="Manage Admin"
        DropDown={DropDown}
      />
    </>
  );
};

export default DashboardNavbar;
