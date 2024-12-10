import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

const token = await getServerSession(options).then((res) => res?.user?.idToken);

const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
}

const ParkService = {
    getParks: async () => {
        const parks = await fetch(`${process.env.BACKEND_URL}/park`, {
            method: "GET",
            headers: headers
        },
        {
            cache: "no-store"
        }
        )
        return parks;
    }
}

export default ParkService;