import { FaLock,FaUserLarge } from "react-icons/fa6";
import { getCsrfToken } from "next-auth/react";

export default function SignIn() {
    const csrfToken = getCsrfToken();

    return(
        <div className="flex flex-col font-bold items-center h-full p-20 text-4xl gap-5">
            <p>Login to Your Account</p>
            <form method="post" action="/api/auth/callback/credentials" className="flex flex-col w-[90%] gap-5 text-3xl">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div>
                    <p>Username</p>
                    <label className="bg-slate-200 rounded-[20px] text-lg p-1 px-3 flex flex-row items-center mt-1">
                        <FaUserLarge />
                        <input name="username" type="text" className="bg-slate-200 text-lg p-1 px-3 focus:outline-none"/>
                    </label>
                </div>
                <div>
                    <p>Password</p>
                    <label className="bg-slate-200 rounded-[20px] text-lg p-1 px-3 flex flex-row items-center mt-1">
                        <FaLock />
                        <input name="password" type="password" className="bg-slate-200 text-lg p-1 px-3 focus:outline-none"/>
                    </label>
                </div>
                <button type="submit" className="bg-gradient-to-r from-[#FFDAC1] from-0% to-[#FFAC75] to-100% p-1 rounded-[20px]">
                    Sign in
                </button>
            </form>
        </div>
    )
}
