"use client";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/Elements/UserAvatar";
import Logo from "@/components/Elements/Logo";
import { useSelector } from "react-redux";
import { MdNotificationsActive } from "react-icons/md";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

const DashboardMainNavbar = ({ NavLinks }: { NavLinks: NavLinks }) => {
  const router = useRouter();
  const { talentNotifications } = useSelector(
    (store: any) => store.notification
  );
  const { companyNotifications } = useSelector(
    (store: any) => store.notification
  );

  const notification = talentNotifications.length + companyNotifications.length;

  return (
    <nav className="fixed inset-0 max-w-[2400px] mx-auto z-30 flex justify-between px-[100px] h-24 max-xlg:px-[50px]  max-md:hidden bg-[#EAEEFE]">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => router.push("/control-room")}
      >
        <Logo />
      </div>
      <div className="flex items-center  gap-7 ">
        <ul className="centered gap-7 ">
          {NavLinks.map((item, idx) => {
            return (
              <div
                className="dash-nav relative group cursor-pointer"
                key={idx}
                onClick={() => router.push(item.href)}
              >
                {item.id === "Notifications" && notification.length > 0 ? (
                  <div>
                    <MdNotificationsActive />
                    <div className="w-4 h-4 text-[10px] centered rounded-full bg-[#010D3E] text-white absolute -top-0.5 -right-0.5">
                      {notification}
                    </div>
                  </div>
                ) : (
                  item.navItem
                )}

                {/* Tooltip */}
                <div className="absolute bottom-[-50px] text-center left-1/2 -translate-x-1/2 mt-3 bg-[#010D3E] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                  {item.id}
                </div>
              </div>
            );
          })}
        </ul>
        <UserAvatar />
      </div>
    </nav>
  );
};

export default DashboardMainNavbar;
