import headers from "./headers";

const ParkDetectionService = {

    parkData: async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PARKING_DETECTION_URL}/parking_lot/${id}`, {
            method: "GET",
            headers: await headers(),
        });
        return response;
    },
    
}

export default ParkDetectionService;