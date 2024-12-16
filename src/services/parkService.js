import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

const ParkService = {
    getParks: async () => {

        const token = await getServerSession(options).then((res) => res?.user?.idToken);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }

        const parks = await fetch(`${process.env.BACKEND_URL}/park`, {
            method: "GET",
            headers: headers
        },
        {
            cache: "no-store"
        }
        )
        return parks;
    },
    getPark: async (id) => {

        const token = await getServerSession(options).then((res) => res?.user?.idToken);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
}

        const park = await fetch(`${process.env.BACKEND_URL}/park/${id}`, {
            method: "GET",
            headers: headers
        },
        {
            cache: "no-store"
        }
        )
        return park;
    }
}

export default ParkService;