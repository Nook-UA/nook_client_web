"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaLock,FaUserLarge } from "react-icons/fa6";

export default function SignIn() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    return(
        <div className="flex flex-col font-bold items-center h-full p-20 text-4xl gap-5">
            <p>Login to Your Account</p>
            <form className="flex flex-col w-[90%] gap-5 text-3xl"
                onSubmit={async (e) => {
                    try {
                      e.preventDefault();
                      const response = await signIn("credentials", {
                        username: username,
                        password: password,
                        redirect: false,
                        callbackUrl: window.location.origin,
                      });
                      if (response?.error) throw new Error(response.error);
                      router.push(response?.url ?? "/");
                    } catch (error) {
                      setError(
                        e instanceof Error ? e.message : "An unknown error occurred."
                      );
                    }
                  }}
            >
                <div>
                    <p>Username</p>
                    <label className="bg-slate-200 rounded-[20px] text-lg p-1 px-3 flex flex-row items-center mt-1">
                        <FaUserLarge />
                        <input name="username" type="text" className="bg-slate-200 text-lg p-1 px-3 focus:outline-none"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <p>Password</p>
                    <label className="bg-slate-200 rounded-[20px] text-lg p-1 px-3 flex flex-row items-center mt-1">
                        <FaLock />
                        <input name="password" type="password" className="bg-slate-200 text-lg p-1 px-3 focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" className="bg-gradient-to-r from-[#FFDAC1] from-0% to-[#FFAC75] to-100% p-1 rounded-[20px]">
                    Sign in
                </button>
                {error}
            </form>
        </div>
    )
}
