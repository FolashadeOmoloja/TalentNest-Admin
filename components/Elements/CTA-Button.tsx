"use client";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

interface ButtonProps {
  className?: string;
  showIcon?: boolean;
  CTA?: string;
  route: string;
  height?: string;
  height2?: string;
  width?: string;
  backGround?: string;
  color?: string;
  isFunc?: boolean;
  func?: () => void;
  disabled?: boolean;
}

const CTABTN: React.FC<ButtonProps> = ({
  className,
  showIcon = false,
  CTA,
  route,
  height = "55px",
  width = "w-[130px]",
  backGround = "bg-black",
  color = "text-white",
  height2,
  isFunc = false,
  func,
  disabled = false,
}) => {
  const router = useRouter();

  const handleSignInClick = (route: string) => {
    if (isFunc && func) {
      func();
    } else {
      router.push(route);
    }
  };

  return (
    <button
      className={`${width} h-[${height}] ${height2} ${backGround} ${color} rounded-[6px] flex items-center justify-center gap-2 font-semibold button-container`}
      onClick={() => handleSignInClick(route)}
      disabled={disabled}
    >
      <span>{CTA}</span>
      <span
        className={`text-sm ${color} ${showIcon ? "icon-animate" : "hidden"}`}
      >
        <FaArrowRight />
      </span>
    </button>
  );
};

export default CTABTN;
