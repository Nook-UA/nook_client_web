import Image from "next/image";
import NookLogo from "@/assets/logo_circle.svg"
import triangle from "@/assets/triangle.svg"


function AuthLayout({ children }){

    return(
        <div className="w-full mx-auto h-screen mt-10">
            <div className="flex w-[65%] mx-auto h-3/4 bg-background">
                <div className="w-[55%] bg-slate-50 rounded-l-lg">
                    {children}
                </div>
                <div className="w-[45%] bg-gradient-to-b from-[#FFAC75] from-60% to-[#D9D9D9] to-100% h-full gap-8 relative overflow-hidden rounded-r-lg">
                    <Image priority src={triangle} className="absolute top-0 left-1 scale-75"/>
                    <Image priority src={triangle} className="absolute top-[-70px] right-[-70px] scale-75 rotate-90"/>
                    <div className="h-full flex flex-col justify-center gap-8 absolute top-0 left-0 items-center">
                        <Image priority src={NookLogo} alt="Nook Logo" className="w-[85%]"/>
                        <div className="text-5xl font-extrabold text-center flex flex-col gap-1">
                            <p>The Parking Lot You</p>
                            <p>Deserve</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;