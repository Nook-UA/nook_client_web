import React from "react";
import ParkService from "@/services/parkService";
import { FaParking } from "react-icons/fa";
import { Button, ParkCard } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function page() {
    const token = await getServerSession(options).then((res) => res?.user?.idToken);
    let parks = [];
    const parksFetch = await ParkService.getParks();
    
    if (parksFetch.ok) {
        parks = await parksFetch.json();
    }

    return (
        <div className="flex flex-col mx-4 my-10">
            <div className="flex flex-row items-center">
                <h1 className="text-4xl text-[#ee9559] font-extrabold flex gap-2 items-center">
                    <FaParking className="text-4xl"/>
                    My Parks
                </h1>
                <Link href="/parks/new" className="ml-auto">
                    <Button className="bg-[#ee9559] rounded-md text-white p-2">
                        <IoAddCircleOutline className="text-2xl"/>
                        Add a new Park
                    </Button>
                </Link>
            </div>
            <line className="w-full bg-gray-200 h-[3px] my-2 rounded-full"/>
            <div className="flex flex-row flex-wrap gap-4 p-4">
                {parks && parks.map((park,index) => (
                    <ParkCard park={park} delay={index} key={index}/>
                ))}
            </div>
        </div>
    );
}
