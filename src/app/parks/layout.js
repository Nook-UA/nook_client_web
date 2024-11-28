import Image from "next/image";
import NookLogo from "@/assets/logo_sm.svg";

export default function layout({ children }) {
  return (
    <div className="flex flex-row justify-start">
      <div className="max-m-[5%] bg-[#FFAC75] min-h-screen flex flex-col items-center">
        <Image
          priority
          src={NookLogo}
          alt="Nook Logo"
          className="w-[7rem] aspect-square p-4"
        />
      </div>
      <div className="grow w-[70%]">{children}</div>
    </div>
  );
}
