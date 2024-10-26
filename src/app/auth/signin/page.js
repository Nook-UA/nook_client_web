"use client";
import { getProviders,signIn } from "next-auth/react"
import { SiAmazoncognito } from "react-icons/si";
import { useEffect, useState } from "react";


export default function SignIn() {
    const [providers, setProviders] = useState([]);

    const signInProvider = async (provider) => {
        await signIn(provider
                     , {
                         redirect:true,
                         callbackUrl: "/",
                     }
        );
    };

    useEffect(() => {
        getProviders().then((providers) => setProviders(providers));
    }, []);
    console.log(providers);
    const letterGradient = "bg-clip-text text-transparent bg-gradient-to-r from-[#FFAC75] to-[#C55002]";

    return(
        <div className="flex flex-col font-bold items-center gap-[30%] h-full w-full p-20 text-4xl">
            <div className="w-full flex flex-col gap-1 items-center">
                <p>Get yourserlf a place</p>
                <p>to <span className={letterGradient}>park your</span></p>
                <p><span className={letterGradient}>costumers</span>!</p>
            </div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="w-full">
                <button onClick={() => signInProvider(provider.id)}
                        className="bg-[#c57e9d] flex items-center gap-3 px-4 py-2 rounded-[20px] border-1 border-gray-400 text-md w-full justify-center">
                    <SiAmazoncognito className="transform translate-y-1" />
                    {provider.name}
                </button>
                </div>
            ))}
        </div>
    )
}
