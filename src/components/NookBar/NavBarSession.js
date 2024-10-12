import options from "../../app/api/auth/[...nextauth]/options";
import {NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { getServerSession } from "next-auth/next";

async function NavbarSession() {
    const session = await getServerSession(options);

    console.log(session?.user);

    return(
        <NavbarContent justify="end">
        {session?.user ? 
        <>
            <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/signout">{session.user.name}</Link>
            </NavbarItem>
            <NavbarItem>
            </NavbarItem>
        </>
        :
        <>
            <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
            </NavbarItem>
        </>
        }
      </NavbarContent>
    )
}

export default NavbarSession;