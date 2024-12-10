import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import ParkService from "@/services/parkService";
import { FaParking } from "react-icons/fa";
import { Button } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link";

export default async function page() {
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
                {parks && parks.map((park) => (
                    <Card key={park.id} className="py-4 border border-gray-100 rounded-md bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
                        <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
                            <h1 className="text-lg font-bold uppercase">{park.name}</h1>
                            <small className="text-default-500">{park.location}</small>
                            <h4 className="text-sm font-light underline">Park Details</h4>
                        </CardHeader>
                        <CardBody className="py-2 overflow-visible">
                            <Image
                                alt={`${park.name} image`}
                                className="object-cover rounded-xl"
                                src={park.image || "https://nextui.org/images/hero-card-complete.jpeg"}
                                width={270}
                            />
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
