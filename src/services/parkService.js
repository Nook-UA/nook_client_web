import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";
import createHeaders from "./headers";

const ParkService = {
    getParks: async () => {


        const parks = await fetch(`${process.env.BACKEND_URL}/park`, {
            method: "GET",
            headers: await createHeaders(),
        },
        {
            cache: "no-store"
        }
        )
        return parks;
    },
    getPark: async (id) => {

        const park = await fetch(`${process.env.BACKEND_URL}/park/${id}`, {
            method: "GET",
            headers: await createHeaders(),
        },
        {
            cache: "no-store"
        }
        )
        return park;
    }
}

export default ParkService;