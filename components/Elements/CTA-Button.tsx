"use client";
import { Loader2 } from "lucide-react";
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
  loading?: boolean;
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
  loading = false,
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
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </div>
      ) : (
        <span>{CTA}</span>
      )}

      <span
        className={`text-sm ${color} ${showIcon ? "icon-animate" : "hidden"}`}
      >
        <FaArrowRight />
      </span>
    </button>
  );
};

export default CTABTN;

// export const FormBtn = ({
//   className = "",
//   cta = "",
//   loading = false,
//   disabled = false,
//   funct
// }) => {
//   return (
//     <button type="submit" className={className} disabled={disabled}>
//       {loading ? (
//         <div className="flex items-center justify-center">
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </div>
//       ) : (
//         cta
//       )}
//     </button>
//   );
// };
