import React from "react";
import { Image } from "@nextui-org/react";
import { FaParking } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import ParkService from "@/services/parkService";

export default async function Page({params}) {
  const {park_id} = params;
  const parkData = await fetch(`${process.env.PARKING_DETECTION_URL}/parking_lot/${park_id}`, {
    method: "GET",
    cache:"no-store"
  }).then((res) => res.json());

  const park = await ParkService.getPark(park_id);

  
  if (!park.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 w-full">
        <h1 className="text-5xl font-bold text-[#FFAC75] mb-6">Park not found</h1>
      </div>
    )
  }
  
  const parkStaticData = await park.json();

  return (
    <div className="mt-10 px-10">
      <h1 className="text-4xl text-[#ee9559] font-extrabold flex gap-2 items-center">
          <div className="relative">
              <FaParking className="text-5xl"/>
              <div className="bg-white absolute top-[-6px] left-[30px] rounded-md aspect-square">
                  <AiOutlineBarChart className="text-2xl"/>
              </div>
          </div>
          Park Overview
      </h1>
      <div className="flex flex-row justify-between">
        <div className="w-[40%]">
          <p className="mb-1"><span className="text-[#ee9559] font-bold text-2xl">Name:</span> <span className="text-xl">{parkStaticData.name}</span></p>
          <p className="mb-1">Total Spaces: {parkData.occupancy.total}</p>
          <p className="mb-1">Occupied: {parkData.occupancy.occupied}</p>
          <p>Free: {parkData.occupancy.freed}</p>
        </div>
        <div className="w-[40%]">
          <Image
            alt={`${park_id} image`}
            className="w-full aspect-video"
            src={`http://localhost:5000${parkData.image_url}`}
          />
        </div>
      </div>
    </div>
  );
}

{/* <div className="flex w-[55%] items-center justify-between">
        <h1 className="text-5xl font-bold text-[#FFAC75] mb-6 ml-auto">Parking Lot Details</h1>
        <a className="ml-auto" href={`/parks/${park_id}/spots`}><button className="bg-[#FFAC75] flex items-center rounded-[20px] font-bold px-2 h-10">Edit Spots</button></a>
      </div>
      
      <div className="w-full flex justify-center">
        <Image
          alt={`${park_id} image`}
          className="w-full h-[500px] object-cover"
          src={`http://localhost:5000${parkData.image_url}`}
        />
      </div>
      
      <div className="w-full flex flex-col items-center py-6 bg-white">
        <h2 className="text-3xl font-semibold mb-2">Parking Lot ID: {park_id}</h2>
        <div className="text-lg font-light text-gray-700 text-center w-full max-w-3xl">
          <p className="mb-1">Total Spaces: {parkData.occupancy.total}</p>
          <p className="mb-1">Occupied: {parkData.occupancy.occupied}</p>
          <p>Free: {parkData.occupancy.freed}</p>
        </div>
      </div> */}
