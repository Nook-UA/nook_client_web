import React from "react";
import { Image } from "@nextui-org/react";

export default async function Page({params}) {
  const {park_id} = params;
  const parkData = await fetch(`http://localhost:5000/parking_lot/${park_id}`, {
    method: "GET",
    cache:"no-store"
  }).then((res) => res.json());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 w-full">
      <div className="flex w-[55%] items-center justify-between">
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
      </div>
    </div>
  );
}
