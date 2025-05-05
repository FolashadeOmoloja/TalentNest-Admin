import { useRouter } from "next/navigation";
import Image from "next/image";

const FormLogo = () => {
  const router = useRouter();
  return (
    <div className="ml-[-35px] cursor-pointer" onClick={() => router.push("/")}>
      <Image
        src={"/images/homepage/TalentNest.png"}
        alt={"logo"}
        width={191}
        height={96}
        quality={100}
        priority
      />
    </div>
  );
};

export default FormLogo;
