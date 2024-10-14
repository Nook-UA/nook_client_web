import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default async function page() {
  const parks = await fetch("http://localhost:8000/park", {
    method: "GET",
  }).then((res) => res.json());
  console.log("========================================================")
  console.log(parks);
  console.log("========================================================")

return (
    <div className="flex flex-col mx-4 my-2">
        <h1 className="text-4xl text-[#FFAC75] font-bold">My Parks</h1>
        <div className="flex flex-row flex-wrap gap-4 p-4">
            {parks.map((park) => (
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
