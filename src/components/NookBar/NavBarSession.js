"use client"
import options from "../../app/api/auth/[...nextauth]/options";
import {NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

 function NavbarSession() {
    const { data: session, status } = useSession(options);

    const handleSignOut =  () => {
        signOut({
            redirect: false,
        }).then(() => {
            window.location.href = process.env.LOGOUT_URL
        });
    }
    return(
        <NavbarContent justify="end">
        {session?.user ? 
        <>
            <NavbarItem className="hidden lg:flex">
            <Link onClick={handleSignOut}>{session.user.email}</Link>
            </NavbarItem>
            <NavbarItem>
            </NavbarItem>
        </>
        :
        <>
            <NavbarItem className="hidden lg:flex">
            <Link href="/auth/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
            </NavbarItem>
        </>
        }
      </NavbarContent>
    )
}

export default NavbarSession;