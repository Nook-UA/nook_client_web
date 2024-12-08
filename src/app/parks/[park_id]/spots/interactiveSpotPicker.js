"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InteractiveSpotPicker({imageUrl,park_id}) {
    
    const router = useRouter();
    const [points, setPoints] = useState([]);
    const [spots,setSpots] = useState([]);

    function relativeCoords ( event ) {
        let bounds = event.currentTarget.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        let arr = [...points,[x,y]];
        if (arr.length > 3){
            let spotCounter = spots.length;
            setSpots([...spots, {name:"spot"+spotCounter, points:arr}]);
            setPoints([]);
            return;    
        }
        setPoints(arr);
    }

    function submit(){
        fetch(`${process.env.PARKING_DETECTION_URL}/parking_lot/${park_id}/spots`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method:"POST",
            body:JSON.stringify(spots),
        }).then((res) => router.push(`/parks/${park_id}`));
    }

    function undo(){
        setPoints([])
        if (spots.length === 0) return;
        console.log(spots.slice(0,spots.length - 1))
        setSpots(spots.slice(0,spots.length - 1))
    }

    function distanceTwoPoints(point1,point2){
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
    }

    function angleBetweenTwoPoints(point1,point2){
        let angle =  Math.atan2(point2[1] - point1[1], point2[0] - point1[0]);
        angle *= 180 / Math.PI;
        angle -= 90;
        console.log(angle)
        return angle
    }

    return(
        <div>
            <div className="relative" onClick={(e) => relativeCoords(e)}>
                <img src={imageUrl}/>
                {points.map((point, index) => (
                    <div key={index} className="absolute top-0 left-0 w-1 h-1 bg-green-400 rounded-full" style={{left: point[0] -2 , top: point[1]-2}}></div>
                ))}
                {spots.map((spot, index) => (
                    <>
                    <div key={"l1-"+index} className="absolute top-0 left-0 bg-red-400 w-1" 
                    style={{left: spot.points[0][0] -2 , top: spot.points[0][1] -2,
                        height: distanceTwoPoints(spot.points[0],spot.points[1]),
                        transform: `rotate(${angleBetweenTwoPoints(spot.points[0],spot.points[1])}deg)`,
                        transformOrigin:"top left"}}>
                        
                    </div>
                    <div key={"l2-"+index} className="absolute top-0 left-0 bg-red-400 w-1" 
                    style={{left: spot.points[1][0] -2 , top: spot.points[1][1] -2,
                        height: distanceTwoPoints(spot.points[1],spot.points[2]),
                        transform: `rotate(${angleBetweenTwoPoints(spot.points[1],spot.points[2])}deg)`,
                        transformOrigin:"top left"}}>
                    </div>
                    <div key={"l3-"+index} className="absolute top-0 left-0 bg-red-400 w-1" 
                    style={{left: spot.points[2][0] -2 , top: spot.points[2][1] -2,
                        height: distanceTwoPoints(spot.points[2],spot.points[3]),
                        transform: `rotate(${angleBetweenTwoPoints(spot.points[2],spot.points[3])}deg)`,
                        transformOrigin:"top left"}}>   
                    </div>
                    <div key={"l4-"+index} className="absolute top-0 left-0 bg-red-400 w-1" 
                    style={{left: spot.points[3][0] -2 , top: spot.points[3][1] -2,
                        height: distanceTwoPoints(spot.points[3],spot.points[0]),
                        transform: `rotate(${angleBetweenTwoPoints(spot.points[3],spot.points[0])}deg)`,
                        transformOrigin:"top left"}}>
                    </div>
                    </>
                ))}
            </div>
            <div className="flex gap-2 justify-center pt-2">
                <Button className="rounded-md bg-red-400" onClick={()=> undo()}>Undo</Button>
                <Button className="rounded-md bg-red-400" onClick={() => submit()}>Submit</Button>
            </div>
        </div>
    )
}