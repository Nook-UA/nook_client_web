"use client";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";

function ParkCard({park,delay}) {
    const router = useRouter();
    return (
        <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{  opacity: 1, 
                        y: 0, 
                        transition: { 
                            duration: 0.5, 
                            delay: delay/10
                        } }}
            whileHover={{ 
                y: -5,
                x: -5,
                boxShadow: "15px 15px 10px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={
                {scale: 0.9}
            }
            onClick={() => router.push(`/parks/${park.id}`)}
        >
        <Card key={park.id} className="py-4 border border-gray-100 rounded-lg bg-white-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
            <CardBody className="py-2 overflow-visible">
                <Image
                    alt={`${park.name} image`}
                    className="object-cover rounded-xl"
                    src={park.picture}
                    width={270}
                    height={200}
                />
            </CardBody>
            <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
                <h1 className="text-lg font-bold uppercase">{park.name}</h1>
                <small className="text-default-500">{park.location}</small>
            </CardHeader>
        </Card>
        </motion.button>
    );
}

export default ParkCard;