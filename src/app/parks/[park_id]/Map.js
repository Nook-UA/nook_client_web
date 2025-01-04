"use client";

import dynamic from "next/dynamic";

const APIProvider = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.APIProvider), { ssr: false });
const MapContainer = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import("@vis.gl/react-google-maps").then(mod => mod.Marker), { ssr: false });





export default function MyMap({position}) {

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

    return (
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} className="w-full h-full">
                <MapContainer
                styles={mapStyles}
                style={{width: '100%', height: '100%'}}
                defaultCenter={{lat: position.latitude, lng: position.longitude}}
                defaultZoom={13}
                gestureHandling={'none'}
                disableDefaultUI={true}
                disableDoubleClickZoom={true}
                />
                <Marker 
                    animation="BOUNCE" 
                    position={{lat: position.latitude, lng: position.longitude}}
                />
                
            </APIProvider>
    );
}