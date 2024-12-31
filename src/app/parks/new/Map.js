"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const APIProvider = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.APIProvider), { ssr: false });
const MapContainer = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.Marker), { ssr: false });





export default function MyMap({data,setData}) {

    const mapStyles = [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
      ];

    const handleClick = useCallback((ev) => {
        setData({...data,
            latitude: ev.detail.latLng.lat,
            longitude: ev.detail.latLng.lng
        })
      });

    return (
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} className="w-full h-full">
                <MapContainer
                styles={mapStyles}
                style={{width: '100%', height: '100%'}}
                defaultCenter={{lat: 40.6405, lng: -8.6538}}
                defaultZoom={13}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onDblclick={handleClick}
                disableDoubleClickZoom={true}
                />
                <Marker 
                    animation="BOUNCE" 
                    position={{lat: data.latitude, lng: data.longitude}}
                />
                
            </APIProvider>
    );
}