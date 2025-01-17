"use client"
import options from "../../app/api/auth/[...nextauth]/options";
import {Link} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

 function NavbarSession() {
    const { data: session, status } = useSession(options);

    const handleSignOut =  () => {
        signOut({
            redirect: false,
        }).then(() => {
            window.location.href = process.env.NEXT_PUBLIC_LOGOUT_URL
        });
    }
    return(
        <div>
        {session?.user ? 
        <>
            <div className="hidden lg:flex gap-2 items-center">
                <Link className="text-white font-bold flex gap-2" onClick={handleSignOut}>
                    <FaUser className="text-1xl text-white"/>
                    {session.user.name}
                </Link>
            </div>
        </>
        :
        <>
            <motion.div className="hidden lg:flex bg-[#eba171] p-2 rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
            <Link className="text-white font-bold" href="/auth/signin">Login</Link>
            </motion.div>
        </>
        }
      </div>
    )
}

export default NavbarSession;