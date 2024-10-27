import Image from "next/image";
import NookLogo from "@/assets/logo_orange.svg"
import triangle from "@/assets/triangle.svg"
import circle from "@/assets/circle.svg"

//background: radial-gradient(45.52% 116.53% at 14.97% 45.67%, #FFAC75 0%, #FFFFFF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;


function AuthLayout({ children }){

    const bgRadian = "radial-gradient(85.52% 116.53% at 14.97% 45.67%, #FFAC75 0%, #FFFFFF 100%);"

    return(
        <div className="h-screen w-full mx-auto relative" style={{background: bgRadian}} >
            <Image priority src={triangle} className="absolute top-[5%] left-[52%] scale-125"/>
            <Image priority src={circle} className="absolute top-[55%] left-[50%] scale-125"/>
            <Image priority src={triangle} className="absolute top-[75%] right-[2%] scale-150 rotate-90"/>
            <div className="flex w-full h-full py-20 justify-around items-center absolute top-0 left-0">
                <div className="h-3/4 bg-slate-50 rounded-l-lg rounded-md">
                    {children}
                </div>
                <div className="w-2/5 h-full gap-8 overflow-hidden rounded-r-lg">
                    <div className="h-full flex flex-col justify-center items-end">
                        <p className="text-end w-full text-7xl font-bold">Get To Know</p>
                        <Image priority src={NookLogo} alt="Nook Logo" className="w-[90%]"/>
                        <p className="text-lg1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;