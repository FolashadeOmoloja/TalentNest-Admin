import { useState } from "react";
import { useSelector } from "react-redux";
import ClientProvider from "../Client/ClientProvider";

const UserAvatar = () => {
  const { user } = useSelector((store: any) => store.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ClientProvider>
      <div
        className="centered max-xsm:justify-start gap-4 cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <div className="w-[51px] h-[51px] rounded-full overflow-hidden border-[0.5px] border-[#010D3E]">
          <div
            className={`w-full h-full text-white text-2xl font-bold centered bg-[#010D3E]`}
          >
            {user?.firstName[0]}
          </div>
        </div>
      </div>
    </ClientProvider>
  );
};

export default UserAvatar;
