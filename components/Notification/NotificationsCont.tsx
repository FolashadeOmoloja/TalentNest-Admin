import { useState } from "react";
import NotificationDets from "../Elements/NotificationDets";

type Notification = {
  _id: string;
  senderMessage: string;
  createdAt: string;
};
type IsActiveState = {
  [key: number]: boolean;
};
const Notifications = ({
  notifications,
  talentNotifications,
  companyNotifications,
  loading,
}: {
  notifications: Notification[];
  talentNotifications: Notification[];
  companyNotifications: Notification[];
  loading: boolean;
}) => {
  const filterArr = ["Companies Notifications", "Talents Notifications"];
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx);
  };

  return (
    <section className="dashboard-container min-h-svh">
      <h2 className="text-2xl font-bold mb-1 bg-text">
        Keep track of Frack notifications
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Note: Deleting notifications here will also remove them from the
        receiver's notification list permanently.
      </p>
      <div className="flex w-full text-[#626263] md:text-lg font-bold mt-16 border-b border-[#CCD2D9]">
        {filterArr.map((item, idx) => (
          <span
            className={`tab ${active[idx] ? "active" : ""} max-sm:h-[50px]`}
            key={idx}
            onClick={() => activeFunc(idx)}
          >
            {item}
          </span>
        ))}
      </div>
      <section className="mt-10">
        {changeTable === 0 ? (
          <NotificationDets
            notifications={companyNotifications}
            loading={loading}
          />
        ) : changeTable === 1 ? (
          <NotificationDets
            notifications={talentNotifications}
            loading={loading}
          />
        ) : null}
      </section>
    </section>
  );
};

export default Notifications;
