import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ClientProvider from "../Client/ClientProvider";

type DropDown = {
  navItem: string;
  icon: string;
  href: string;
}[];

const UserAvatar = ({ dropDown }: { dropDown: DropDown }) => {
  const { user } = useSelector((store: any) => store.auth);
  const router = useRouter();
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
        <BsCaretDownFill fontSize={13} className="max-md:hidden" />
        {isOpen && (
          <ul className="absolute z-20 mt-5 top-full right-0 bg-white  rounded-lg pl-6 py-[27px]  w-[180px]  flex flex-col gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-md:hidden">
            {dropDown.map((item, idx) => (
              <li
                onClick={() => router.push(item.href)}
                className="gap-4 flex items-center text-[#7C8698] hover:text-[#010D3E] hover:font-medium transition-all "
                key={idx}
              >
                <img
                  src={item.icon}
                  alt="icon"
                  className="w-4 h-4 object-center object-cover "
                />
                <span>{item.navItem}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ClientProvider>
  );
};

export default UserAvatar;
