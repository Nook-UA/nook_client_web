import React from "react";
import { Image } from "@nextui-org/react";
import { FaParking } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import ParkService from "@/services/parkService";
import ParkDetectionService from "@/services/parkDetectionService";
import { Button } from "@/components";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import Mymap from "./Map";

export default async function Page({params}) {
  const {park_id} = params;

  const park = await ParkService.getPark(park_id);

  if (!park.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 w-full">
        <h1 className="text-5xl font-bold text-[#FFAC75] mb-6">Park not found</h1>
      </div>
    )
  }
  
  let parkData = await ParkDetectionService.parkData(park_id);
  if (!parkData.ok) {
    parkData = {
      occupancy: {
        total: "Not Available",
        occupied: "Not Available",
        freed: "Not Available"
      }
    }
  }else{
    parkData = await parkData.json();
  }
  
  
  const parkStaticData = await park.json();

  return (
    <div className="mt-10 px-10">
      <div className="flex flex-row items-center pb-6">
        <h1 className="text-4xl text-[#ee9559] font-extrabold flex gap-2 items-center">
            <div className="relative">
                <FaParking className="text-5xl"/>
                <div className="bg-white absolute top-[-6px] left-[30px] rounded-md aspect-square">
                    <AiOutlineBarChart className="text-2xl"/>
                </div>
            </div>
            Park Overview
        </h1>
        <Link href={`/parks/${park_id}/spots`} className="ml-auto">
          <Button className="bg-[#ee9559] rounded-md text-white p-2">
            <FaEdit className="text-xl"/>
            Edit Spots
          </Button>
        </Link>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[40%]">
          <Image 
            alt={`${park_id} image`}
            className="max-h-40 aspect-video"
            src={parkStaticData.picture}
          />
          <p className="mb-1 pt-2"><span className="text-[#ee9559] font-bold text-2xl">Name:</span> <span className="text-xl">{parkStaticData.name}</span></p>
          <p className="mb-1">Total Spaces: {parkData.occupancy.total}</p>
          <p className="mb-1">Free: {parkData.occupancy.freed}</p>
          <p className="mb-1">Occupied: {parkData.occupancy.occupied}</p>
          <p className="mb-1"><span className="">Stream:</span> <span className="">{parkStaticData.rtsp_url}</span></p>
        </div>
        <div className="w-[40%]">
          <Image
            alt={`${park_id} image`}
            className="w-full aspect-video"
            src={`${process.env.NEXT_PUBLIC_PARKING_DETECTION_URL}${parkData.image_url}`}
          />
        </div>
      </div>
      <div className="w-full h-[450px] border-3 p-1 border-[#ee9559] rounded-md overflow-hidden mt-3">
        <Mymap position={{latitude: parkStaticData.latitude, longitude: parkStaticData.longitude}}/> 
      </div>
    </div>
  );
}
