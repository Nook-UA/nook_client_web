import NavbarSession from "./NavBarSession";
import Image from "next/image";
import NookLogo from "@/assets/logo_sm.svg";
import { FaGaugeHigh } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import NavButton from "./NavButton";

function NookNavbar() {
  
  return (
    <div className="max-m-[5%] min-w-[8%] bg-[#ee9559] min-h-screen flex flex-col items-center pb-4">
        <div className="w-full p-2">
          <div className="bg-[#fcbe96] rounded-full aspect-square w-full flex items-center justify-center">
            <Image
              priority
              src={NookLogo}
              alt="Nook Logo"
              className="w-[7rem] aspect-square p-4"
            />
          </div>
        </div>
        <div className="w-full text-sm p-2 text-[#FDCBA9] font-bold">
          Menu
        </div>
        <div className="w-full pl-3 pr-2 flex flex-col gap-3 text-white">
          {/* <NavButton props={{href: "/dashboard"}}>
            <FaGaugeHigh className="text-xl"/>
            Dashboard
          </NavButton> */}
          <NavButton props={{href: "/parks"}}>
            <FaParking className="text-xl"/>
            Parks
          </NavButton>
        </div>
        <div className="mt-auto">
          <NavbarSession/>
        </div>
      </div>
  );
}

export default NookNavbar;