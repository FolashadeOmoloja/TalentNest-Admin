"use client";
import DashboardNavbar from "@/components/Navbar/Navbar";
import Notifications from "@/components/Notification/NotificationsCont";
import { useGetAdminNotifications } from "@/hooks/notification-hook";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const { loading } = useGetAdminNotifications();
  const { notification } = useSelector((store: any) => store.notification);
  const { companyNotifications } = useSelector(
    (store: any) => store.notification
  );
  const { talentNotifications } = useSelector(
    (store: any) => store.notification
  );

  return (
    <>
      <DashboardNavbar activeItem={0} />
      <Notifications
        notifications={notification}
        loading={loading}
        companyNotifications={companyNotifications}
        talentNotifications={talentNotifications}
      />
    </>
  );
};

export default SettingsPage;
